import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { DetalhesMedicoModel } from '../medicos.models';
import { filter, map, Observer, shareReplay, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-excluir-medico',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './excluir-medico.html',
})
export class ExcluirMedico {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly medicosService = inject(MedicosService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly medico$ = this.route.data.pipe(
    filter((data) => data['medico']),
    map((data) => data['medico'] as DetalhesMedicoModel),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public excluir() {
    const exclusaoObserver: Observer<null> = {
      next: () => this.notificacaoService.sucesso(`O registro foi excluído com sucesso!`),
      error: (err) => this.notificacaoService.erro(err.error.erros[0]),
      complete: () => this.router.navigate(['/medicos']),
    };

    this.medico$
      .pipe(
        take(1),
        switchMap((medico) => this.medicosService.excluir(medico.dados.id)),
      )
      .subscribe(exclusaoObserver);
  }
}
