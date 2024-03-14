import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly userIsLoggedIn: WritableSignal<any>;
  public userIsLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.userIsLoggedIn = signal(this.tokenExists())
    this.userIsLoggedIn$ = toObservable(this.userIsLoggedIn);
  }

  private tokenExists(): boolean {
    return !!localStorage.getItem("token");
  }

  public login(username: string, password: string) {
    this.http.post("http://localhost:8080/api/login", {username, password}, {observe: 'response'})
      .subscribe({
        next: response => {
          this.userIsLoggedIn.set(this.onLogin(response));
        },
        error: () => {
          console.error("Invalid Login");
          this.userIsLoggedIn.set(false);
        }
      })
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.userIsLoggedIn.set(false);
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
