import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@app/services/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router)

  const token = tokenService.getToken()
  if (token) {
    router.navigateByUrl('/boards');
  }
  return true;
};
