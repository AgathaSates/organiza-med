import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  DetalhesMedicoModel,
  EditarMedicoModel,
  EditarMedicoResponseModel,
} from '../medicos.models';
import { filter, map, tap, shareReplay, Observer, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-editar-medico',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-medico.html',
})
export class EditarMedico {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly medicosService = inject(MedicosService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected medicoForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    crm: ['', [Validators.required, Validators.pattern(/^\d{5}-[A-Z]{2}$/)]],
  });

  get nome() {
    return this.medicoForm.get('nome');
  }

  get crm() {
    return this.medicoForm.get('crm');
  }

  protected readonly medicos$ = this.route.data.pipe(
    filter((data) => data['medicos']),
    map((data) => data['medicos'] as DetalhesMedicoModel),
    tap((medico) => this.medicoForm.patchValue(medico.dados)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public editar() {
    if (this.medicoForm.invalid) return;

    const editarMedicoModel: EditarMedicoModel = this.medicoForm.value;

    const edicaoObserver: Observer<EditarMedicoResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${editarMedicoModel.nome}" foi editado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.error.erros[0]),
      complete: () => this.router.navigate(['/medicos']),
    };

    this.medicos$
      .pipe(
        take(1),
        switchMap((medico) => this.medicosService.editar(medico.dados.id, editarMedicoModel)),
      )
      .subscribe(edicaoObserver);
  }
}
