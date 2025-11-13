import { ListarMedicos } from './listar/listar-medicos';
import { CadastrarMedico } from './cadastrar/cadastrar-medico';
import { EditarMedico } from './editar/editar-medico';
import { ExcluirMedico } from './excluir/excluir-medico';
import { MedicosService } from './medicos.service';
import { MedicoModel } from './medicos.models';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

const listagemMedicosResolver: ResolveFn<MedicoModel[]> = () => {
  const medicosService = inject(MedicosService);

  return medicosService.SelecionarTodos();
};

const detalhesMedicosResolver = (route: ActivatedRouteSnapshot) => {
  const medicosService = inject(MedicosService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const medicoId = route.paramMap.get('id')!;

  return medicosService.selecionarPorId(medicoId);
};

export const medicosRoutes = [
  {
    path: '',
    children: [
      { path: '', component: ListarMedicos, resolve: { medicos: listagemMedicosResolver } },
      {
        path: 'cadastrar',
        component: CadastrarMedico,
      },
      {
        path: 'editar/:id',
        component: EditarMedico,
        resolve: { medico: detalhesMedicosResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirMedico,
        resolve: { medico: detalhesMedicosResolver },
      },
    ],
    providers: [MedicosService],
  },
];
