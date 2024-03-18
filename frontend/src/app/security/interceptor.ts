import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {inject} from "@angular/core";
import {LoginService} from "./login.service";

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem("token");
  const loginService = inject(LoginService);
  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': token
      }
    });
  }
  return next(req).pipe(
    catchError(error => {
      if (error.status === 403 || error.status === 401) {
        console.warn("Unauthorized access, logging out...")
        loginService.logout();
      }
      throw error;
    })
  )
}
