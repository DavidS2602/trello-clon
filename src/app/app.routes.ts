import type { Routes } from '@angular/router';
import { LayoutComponent } from './auth/pages/layout/layout.component';
import { authGuard } from './auth/guards/auth.guard';
import { redirectGuard } from './auth/guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    canActivate: [redirectGuard],
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
    canActivate: [authGuard], // This is the guard
    loadComponent: () => import('./pages/boards/boards.component')
  },
  {
    path: 'board',
    canActivate: [authGuard], // This is the guard
    loadComponent: () => import('./pages/board/board.component')
  }
];
