import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";


export const userIsNotLoggedInGuard: CanActivateFn = () => {
  return !inject(LoginService).userIsLoggedIn() || inject(Router).createUrlTree(["/user"]);
};

export const userIsLoggedInGuard: CanActivateFn = () => {
  return inject(LoginService).userIsLoggedIn() || inject(Router).createUrlTree(["/home"]);
};

export const userIsAdminGuard: CanActivateFn = () => {
  return inject(LoginService).userIsAdmin() || inject(Router).createUrlTree(["/home"]);
};
