import { AsyncPipe, DatePipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AtividadesMedicasService } from '../atividades-medicas.service';
import { filter, map } from 'rxjs';
import { AtividadeMedicaModel } from '../atividades-medicas.models';

@Component({
  selector: 'app-listar-atividades-medicas',
  imports: [
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SlicePipe,
    DatePipe,
  ],
  templateUrl: './listar-atividades-medicas.html',
})
export class ListarAtividadesMedicas {
  protected readonly route = inject(ActivatedRoute);
  protected readonly atividadesMedicasService = inject(AtividadesMedicasService);

  protected readonly atividadesMedicas$ = this.route.data.pipe(
    filter((data) => data['atividadesMedicas']),
    map((data) => data['atividadesMedicas'] as AtividadeMedicaModel[]),
  );
}
