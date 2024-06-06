import type { Routes } from '@angular/router';
import { LayoutComponent } from './auth/pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login.component')
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/reset-password/reset-password.component')
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./auth/pages/sign-up/sign-up.component')
      },
      {
        path: 'new-password',
        loadComponent: () => import('./auth/pages/new-password/new-password.component')
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ],
  },
  {
    path: 'boards',
    loadComponent: () => import('./pages/boards/boards.component')
  },
  {
    path: 'board',
    loadComponent: () => import('./pages/board/board.component')
  }
];
