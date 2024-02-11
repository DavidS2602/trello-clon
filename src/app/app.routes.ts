import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/login/login.component')
            },
            {
                path: 'reset-password',
                loadComponent: () => import('./pages/reset-password/reset-password.component')
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./pages/sign-up/sign-up.component')
            }
        ],
    },
    {
        path: 'boards',
        loadComponent: () => import('./pages/boards/boards.component')
    }
];
