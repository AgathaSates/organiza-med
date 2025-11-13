import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CadastrarMedicoModel,
  CadastrarMedicoResponseModel,
  DetalhesMedicoModel,
  EditarMedicoModel,
  EditarMedicoResponseModel,
  ListagemMedicosApiResponse,
  MedicoModel,
} from './medicos.models';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/medicos';

  public cadastrar(medicoModel: CadastrarMedicoModel): Observable<CadastrarMedicoResponseModel> {
    return this.http.post<CadastrarMedicoResponseModel>(this.apiUrl, medicoModel);
  }

  public editar(
    id: string,
    editarMedicoModel: EditarMedicoModel,
  ): Observable<EditarMedicoResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarMedicoResponseModel>(urlCompleto, editarMedicoModel);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesMedicoModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesMedicoModel>(urlCompleto);
  }

  public SelecionarTodos(): Observable<MedicoModel[]> {
    return this.http
      .get<ListagemMedicosApiResponse>(this.apiUrl)
      .pipe(map((response) => response.dados.registros));
  }
}
