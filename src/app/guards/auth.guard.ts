import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
//define una función que Angular ejecuta antes de mostrar una ruta, y decide si deja pasar o no
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.haySesion() ? true : router.createUrlTree(['/login']);
};