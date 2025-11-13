import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ListarPacientes } from './listar/listar-pacientes';
import { PacienteModel } from './pacientes.models';
import { PacientesService } from './pacientes.service';
import { CadastrarPaciente } from './cadatrar/cadastrar-paciente';
import { EditarPaciente } from './editar/editar-paciente';
import { ExcluirPaciente } from './excluir/excluir-paciente';

const listagemPacientesResolver: ResolveFn<PacienteModel[]> = () => {
  const pacientesService = inject(PacientesService);

  return pacientesService.SelecionarTodos();
};

const detalhesPacientesResolver = (route: ActivatedRouteSnapshot) => {
  const pacientesService = inject(PacientesService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const pacienteId = route.paramMap.get('id')!;

  return pacientesService.selecionarPorId(pacienteId);
};

export const pacientesRoutes = [
  {
    path: '',
    children: [
      { path: '', component: ListarPacientes, resolve: { pacientes: listagemPacientesResolver } },
      {
        path: 'cadastrar',
        component: CadastrarPaciente,
      },
      {
        path: 'editar/:id',
        component: EditarPaciente,
        resolve: { paciente: detalhesPacientesResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirPaciente,
        resolve: { paciente: detalhesPacientesResolver },
      },
    ],
    providers: [PacientesService],
  },
];
