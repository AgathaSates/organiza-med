import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { CanActivateFn, provideRouter, Router, Routes } from '@angular/router';
import { provideAuth } from './components/auth/auth.provider';
import { AuthService } from './components/auth/auth.service';
import { map, take } from 'rxjs';
import { provideNotifications } from './components/shared/notificacao/notificacao.provider';

const usuarioDesconhecidoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    take(1),
    map((token) => (!token ? true : router.createUrlTree(['/inicio']))),
  );
};

const usuarioAutenticadoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    take(1),
    map((token) => (token ? true : router.createUrlTree(['/auth/login']))),
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then((r) => r.authRoutes),
    canActivate: [usuarioDesconhecidoGuard],
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((h) => h.AsInicio),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./components/pacientes/pacientes.routes').then((r) => r.pacientesRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'medicos',
    loadChildren: () => import('./components/medicos/medicos.routes').then((r) => r.medicosRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'atividades-medicas',
    loadChildren: () =>
      import('./components/atividades-medicas/atividades-medicas.routes').then(
        (r) => r.atividadesMedicasRoutes,
      ),
    canActivate: [usuarioAutenticadoGuard],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNotifications(),
    provideAuth(),
  ],
};
