import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { MedicoModel } from '../medicos.models';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-listar-medicos',
  imports: [
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SlicePipe,
  ],
  templateUrl: './listar-medicos.html',
})
export class ListarMedicos {
  protected readonly route = inject(ActivatedRoute);
  protected readonly medicosService = inject(MedicosService);

  protected readonly medicos$ = this.route.data.pipe(
    filter((data) => data['medicos']),
    map((data) => data['medicos'] as MedicoModel[]),
  );
}
