import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent() {
      return import('./components/inicio/inicio').then((h) => h.AsInicio);
    },
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./components/pacientes/pacientes.routes').then((r) => r.pacientesRoutes),
  },
  {
    path: 'medicos',
    loadChildren: () => import('./components/medicos/medicos.routes').then((r) => r.medicosRoutes),
  },
  {
    path: 'atividades-medicas',
    loadChildren: () =>
      import('./components/atividades-medicas/atividades-medicas.routes').then(
        (r) => r.atividadesMedicasRoutes,
      ),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
