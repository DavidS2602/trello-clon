import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@app/services/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router)

  const token = tokenService.getToken()
  const isValidToken = tokenService.isValidToken();
  if (token) {
    router.navigateByUrl('/boards');
  }
  if (isValidToken) {
    router.navigateByUrl('/boards');
  }
  return true;
};
