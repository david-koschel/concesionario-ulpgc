import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem("token");
  if (token) {
    return next(req.clone({
      setHeaders: {
        'Authorization': token
      }
    }));
  } else {
    return next(req);
  }
}
