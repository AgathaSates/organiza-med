import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AtividadeMedicaModel } from './atividades-medicas.models';
import { AtividadesMedicasService } from './atividades-medicas.service';
import { ListarAtividadesMedicas } from './listar/listar-atividades-medicas';

const listagemAtividadesMedicasResolver: ResolveFn<AtividadeMedicaModel[]> = () => {
  const pacientesService = inject(AtividadesMedicasService);

  return pacientesService.SelecionarTodos();
};

export const atividadesMedicasRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarAtividadesMedicas,
        resolve: { atividadesMedicas: listagemAtividadesMedicasResolver },
      },
    ],
    providers: [AtividadesMedicasService],
  },
];
