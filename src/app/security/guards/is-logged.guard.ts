import { UserFunctions } from './../../functions/user.functions';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const userFunctions = new UserFunctions();
  const router = inject(Router);

  if(!userFunctions.isLogged()){
    router.navigate(["login"]);
    return false;
  }


  return true;
};
