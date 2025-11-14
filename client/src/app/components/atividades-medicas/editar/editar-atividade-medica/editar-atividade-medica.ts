import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../shared/notificacao/notificacao.service';
import { AtividadesMedicasService } from '../../atividades-medicas.service';
import { MatSelectModule } from '@angular/material/select';
import {
  DetalhesAtividadeMedicaModel,
  EditarAtividadeMedicaModel,
  EditarAtividadeMedicaResponseModel,
  TipoAtividadeMedica,
} from '../../atividades-medicas.models';
import { apenasUmMedicoPorConsulta } from '../../validators/um-medico-permitido';
import { filter, map, tap, Observer, shareReplay, switchMap, take } from 'rxjs';
import { MedicoModel } from '../../../medicos/medicos.models';
import { format, parse } from 'date-fns';

@Component({
  selector: 'app-editar-atividade-medica',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './editar-atividade-medica.html',
})
export class EditarAtividadeMedica {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly atividadesMedicasService = inject(AtividadesMedicasService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected atividadeForm: FormGroup = this.formBuilder.group(
    {
      inicio: [format(new Date(), 'dd/MM/yyyy HH:mm:ss'), [Validators.required]],
      termino: [format(new Date(), 'dd/MM/yyyy HH:mm:ss'), [Validators.required]],
      tipoAtividade: [TipoAtividadeMedica.Consulta, [Validators.required]],
      medicos: [[], [Validators.required]],
    },
    { validators: [apenasUmMedicoPorConsulta] },
  );

  get inicio() {
    return this.atividadeForm.get('inicio');
  }

  get termino() {
    return this.atividadeForm.get('termino');
  }

  get medicos() {
    return this.atividadeForm.get('medicos');
  }

  protected readonly atividade$ = this.route.data.pipe(
    filter((data) => data['atividadesMedicas']),
    map((data) => data['atividadesMedicas'] as DetalhesAtividadeMedicaModel),
    tap((atividade) => {
      const dados = atividade.dados;

      this.atividadeForm.patchValue({
        ...dados,
        inicio: dados.inicio ? format(new Date(dados.inicio), 'dd/MM/yyyy HH:mm:ss') : '',
        termino: dados.termino ? format(new Date(dados.termino), 'dd/MM/yyyy HH:mm:ss') : '',
      });
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly medicos$ = this.route.data.pipe(
    filter((data) => data['medicos']),
    map((data) => data['medicos'] as MedicoModel[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public editar() {
    if (this.atividadeForm.invalid) {
      return;
    }

    const medicosFormValue = this.medicos?.value;

    const editarPayload: EditarAtividadeMedicaModel = {
      inicio: this.inicio?.value
        ? parse(this.inicio.value, 'dd/MM/yyyy HH:mm:ss', new Date())
        : null,
      termino: this.termino?.value
        ? parse(this.termino.value, 'dd/MM/yyyy HH:mm:ss', new Date())
        : null,
      medicos: Array.isArray(medicosFormValue)
        ? medicosFormValue
        : medicosFormValue != null
          ? [medicosFormValue]
          : [],
    };

    const editarObserver: Observer<EditarAtividadeMedicaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `A atividade médica com início em ${editarPayload.inicio?.toLocaleString?.() ?? ''} foi editada com sucesso!`,
        ),
      error: (erro) => this.notificacaoService.erro(erro.error.erros[0]),
      complete: () => this.router.navigate(['/atividades-medicas']),
    };

    this.atividade$
      .pipe(
        take(1),
        switchMap((atividade) =>
          this.atividadesMedicasService.editar(atividade.dados.id, editarPayload),
        ),
      )
      .subscribe(editarObserver);
  }
}
