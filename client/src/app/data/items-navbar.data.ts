import { ItensNavbar } from '../models/itens-navbar';

export const ITENS_NAVBAR: readonly ItensNavbar[] = [
  { nome: 'Início', icone: 'home', route: '/inicio' },
  { nome: 'Pacientes', icone: 'personal_injury', route: '/pacientes' },
  { nome: 'Médicos', icone: 'medical_information', route: '/medicos' },
  { nome: 'Procedimentos', icone: 'vaccines', route: '/atividades-medicas' },
];
