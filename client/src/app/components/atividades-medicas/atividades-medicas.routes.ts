import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AtividadeMedicaModel } from './atividades-medicas.models';
import { AtividadesMedicasService } from './atividades-medicas.service';
import { ListarAtividadesMedicas } from './listar/listar-atividades-medicas';
import { MedicosService } from '../medicos/medicos.service';
import { PacientesService } from '../pacientes/pacientes.service';
import { CadastrarAtividadesMedicas } from './cadastrar/cadastrar-atividades-medicas';
import { EditarAtividadeMedica } from './editar/editar-atividade-medica/editar-atividade-medica';
import { ExcluirAtividadeMedica } from './excluir/excluir-atividade-medica/excluir-atividade-medica';

export const listagemAtividadesMedicasResolver: ResolveFn<AtividadeMedicaModel[]> = () => {
  const pacientesService = inject(AtividadesMedicasService);

  return pacientesService.SelecionarTodos();
};

export const listarPacientesResolver = () => {
  return inject(PacientesService).SelecionarTodos();
};

export const listarMedicosResolver = () => {
  return inject(MedicosService).SelecionarTodos();
};

export const detalhesAtividadeMedicaResolver = (route: ActivatedRouteSnapshot) => {
  const atividadeMedicaService = inject(AtividadesMedicasService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const atividaedId = route.paramMap.get('id')!;

  return atividadeMedicaService.selecionarPorId(atividaedId);
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
      {
        path: 'cadastrar',
        component: CadastrarAtividadesMedicas,
        resolve: { pacientes: listarPacientesResolver, medicos: listarMedicosResolver },
      },
      {
        path: 'editar/:id',
        component: EditarAtividadeMedica,
        resolve: {
          atividadesMedicas: detalhesAtividadeMedicaResolver,
          medicos: listarMedicosResolver,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirAtividadeMedica,
        resolve: { atividadeMedica: detalhesAtividadeMedicaResolver },
      },
    ],
    providers: [AtividadesMedicasService, PacientesService, MedicosService],
  },
];
