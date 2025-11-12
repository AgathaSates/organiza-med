import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ListagemPacientesApiResponse, PacienteModel } from './pacientes.models';

@Injectable({ providedIn: 'root' })
export class PacientesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/pacientes';

  public SelecionarTodos(): Observable<PacienteModel[]> {
    return this.http
      .get<ListagemPacientesApiResponse>(this.apiUrl)
      .pipe(map((response) => response.dados.registros));
  }
}
