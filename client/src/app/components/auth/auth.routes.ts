import { Routes } from '@angular/router';
import { Registro } from './registro/registro';
import { Login } from './login/login';

export const authRoutes: Routes = [
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
];
