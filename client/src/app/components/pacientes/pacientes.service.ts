import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CadastrarPacienteModel,
  CadastrarPacienteResponseModel,
  DetalhesPacienteModel,
  EditarPacienteModel,
  EditarPacienteResponseModel,
  ListagemPacientesApiResponse,
  PacienteModel,
} from './pacientes.models';

@Injectable({ providedIn: 'root' })
export class PacientesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/pacientes';

  public cadastrar(
    pacienteModel: CadastrarPacienteModel,
  ): Observable<CadastrarPacienteResponseModel> {
    return this.http.post<CadastrarPacienteResponseModel>(this.apiUrl, pacienteModel);
  }

  public editar(
    id: string,
    editarpacienteModel: EditarPacienteModel,
  ): Observable<EditarPacienteResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarPacienteResponseModel>(urlCompleto, editarpacienteModel);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesPacienteModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesPacienteModel>(urlCompleto);
  }

  public SelecionarTodos(): Observable<PacienteModel[]> {
    return this.http
      .get<ListagemPacientesApiResponse>(this.apiUrl)
      .pipe(map((response) => response.dados.registros));
  }
}
