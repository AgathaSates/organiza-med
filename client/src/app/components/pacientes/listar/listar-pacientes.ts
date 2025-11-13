import { Component, inject } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PacienteModel } from '../pacientes.models';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-listar-pacientes',
  imports: [
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SlicePipe,
  ],
  templateUrl: './listar-pacientes.html',
})
export class ListarPacientes {
  protected readonly route = inject(ActivatedRoute);
  protected readonly pacientesService = inject(PacientesService);

  protected readonly pacientes$ = this.route.data.pipe(
    filter((data) => data['pacientes']),
    map((data) => data['pacientes'] as PacienteModel[]),
  );
}
