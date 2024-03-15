import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly userIsLoggedInSignal: WritableSignal<any>;
  public userIsLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.userIsLoggedInSignal = signal(this.userIsLoggedIn())
    this.userIsLoggedIn$ = toObservable(this.userIsLoggedInSignal);
  }

  public userIsLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public login(username: string, password: string) {
    this.http.post("http://localhost:8080/api/login", {username, password}, {observe: 'response'})
      .subscribe({
        next: response => {
          this.userIsLoggedInSignal.set(this.onLogin(response));
        },
        error: () => {
          console.error("Invalid Login");
          this.userIsLoggedInSignal.set(false);
        }
      })
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.userIsLoggedInSignal.set(false);
    this.router.navigate(["home"])
  }

  private onLogin(response: HttpResponse<any>): boolean {
    const token = response?.headers.get("Authorization")
    if (token) {
      localStorage.setItem("token", token);
      return true;
    } else {
      console.error("No token in authorization")
      return false;
    }
  }
}
