import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
  AtividadeMedicaModel,
  CadastrarAtividadeMedicaModel,
  CadastrarAtividadeMedicaResponseModel,
  DetalhesAtividadeMedicaModel,
  EditarAtividadeMedicaModel,
  EditarAtividadeMedicaResponseModel,
  ListagemAtividadesMedicasApiResponse,
} from './atividades-medicas.models';

@Injectable()
export class AtividadesMedicasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/atividades-medicas';

  public cadastrar(
    atividadeMedicaModel: CadastrarAtividadeMedicaModel,
  ): Observable<CadastrarAtividadeMedicaResponseModel> {
    return this.http.post<CadastrarAtividadeMedicaResponseModel>(this.apiUrl, atividadeMedicaModel);
  }

  public editar(
    id: string,
    editarAtividadeMedicaModel: EditarAtividadeMedicaModel,
  ): Observable<EditarAtividadeMedicaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarAtividadeMedicaResponseModel>(
      urlCompleto,
      editarAtividadeMedicaModel,
    );
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesAtividadeMedicaModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesAtividadeMedicaModel>(urlCompleto);
  }

  public SelecionarTodos(): Observable<AtividadeMedicaModel[]> {
    return this.http
      .get<ListagemAtividadesMedicasApiResponse>(this.apiUrl)
      .pipe(map((response) => response.dados.registros));
  }
}
