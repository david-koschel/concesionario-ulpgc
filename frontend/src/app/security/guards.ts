import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";


export const userIsLoggedInGuard: CanActivateFn = () => {
  return inject(LoginService).userIsLoggedIn() || inject(Router).createUrlTree(["/home"]);
};
