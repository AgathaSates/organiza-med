import { ItemsNavbar } from '../models/items-navbar';

export const ITEMS_NAVBAR: readonly ItemsNavbar[] = [
  { name: 'Início', icon: 'home', route: '/home' },
  { name: 'Pacientes', icon: 'personal_injury', route: '/pacientes' },
  { name: 'Médicos', icon: 'medical_information', route: '/medicos' },
  { name: 'Procedimentos', icon: 'vaccines', route: '/atividades-medicas' },
];
