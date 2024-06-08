import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@app/services/token.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router)

  const token = tokenService.getToken()
  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  authService.getProfile().subscribe(
    () => {},
    (error) => {
      if (error.status === 401) {
        tokenService.removeToken();
        router.navigateByUrl('/auth/login');
      }
    }
  )

  return true;
};
