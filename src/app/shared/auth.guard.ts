import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  let authService:AuthService = inject(AuthService);
  let router:Router = inject(Router);

  return authService.isAdmin().then(authentifie => {
    if (authentifie){
      console.log("Vous êtes bien authentifié");
      return true;
    } else {
      console.log("Vous n'êtes pas authentifié");
      router.navigate(['/home']);
      return false;
    }
  })
};
