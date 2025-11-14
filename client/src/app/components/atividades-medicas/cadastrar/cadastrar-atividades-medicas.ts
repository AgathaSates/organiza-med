import { parse } from 'date-fns';

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { AtividadesMedicasService } from '../atividades-medicas.service';
import {
  CadastrarAtividadeMedicaModel,
  CadastrarAtividadeMedicaResponseModel,
  TipoAtividadeMedica,
} from '../atividades-medicas.models';
import { apenasUmMedicoPorConsulta } from '../validators/um-medico-permitido';
import { filter, map, Observer, shareReplay } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MedicoModel } from '../../medicos/medicos.models';
import { PacienteModel } from '../../pacientes/pacientes.models';

@Component({
  selector: 'app-cadastrar-atividades-medicas',
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
  templateUrl: './cadastrar-atividades-medicas.html',
})
export class CadastrarAtividadesMedicas {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly atividadesMedicasService = inject(AtividadesMedicasService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected atividadeForm: FormGroup = this.formBuilder.group(
    {
      pacienteId: ['', [Validators.required]],
      inicio: [new Date().toLocaleString('pt-Br'), [Validators.required]],
      termino: [new Date().toLocaleString('pt-Br'), [Validators.required]],
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

  get tipoAtividade() {
    return this.atividadeForm.get('tipoAtividade');
  }

  get pacienteId() {
    return this.atividadeForm.get('pacienteId');
  }

  get medicos() {
    return this.atividadeForm.get('medicos');
  }

  protected readonly tiposAtividadeMedica = Object.values(TipoAtividadeMedica);

  protected readonly medicos$ = this.route.data.pipe(
    filter((data) => data['medicos']),
    map((data) => data['medicos'] as MedicoModel[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly pacientes$ = this.route.data.pipe(
    filter((data) => data['pacientes']),
    map((data) => data['pacientes'] as PacienteModel[]),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public cadastrar() {
    if (this.atividadeForm.invalid) return;

    const medicosValue = this.medicos?.value;

    const atividadeMedicaModel: CadastrarAtividadeMedicaModel = {
      ...this.atividadeForm.value,
      inicio: this.inicio?.value
        ? parse(this.inicio.value, 'dd/MM/yyyy, HH:mm:ss', new Date())
        : null,
      termino: this.termino?.value
        ? parse(this.termino.value, 'dd/MM/yyyy, HH:mm:ss', new Date())
        : null,
      medicos: Array.isArray(medicosValue)
        ? [...medicosValue]
        : medicosValue != null
          ? [medicosValue]
          : [],
    };

    const cadastroObserver: Observer<CadastrarAtividadeMedicaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `A atividade médica com início em ${atividadeMedicaModel.inicio.toLocaleString()} foi cadastrada com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.error.erros[0]),
      complete: () => this.router.navigate(['/atividades-medicas']),
    };

    this.atividadesMedicasService.cadastrar(atividadeMedicaModel).subscribe(cadastroObserver);
  }
}
