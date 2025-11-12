import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ListagemMedicosApiResponse, MedicoModel } from './medicos.models';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/medicos';

  public SelecionarTodos(): Observable<MedicoModel[]> {
    return this.http
      .get<ListagemMedicosApiResponse>(this.apiUrl)
      .pipe(map((response) => response.dados.registros));
  }
}
