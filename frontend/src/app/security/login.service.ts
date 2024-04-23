import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly userIsLoggedInSignal: WritableSignal<any>;
  public userIsLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.userIsLoggedInSignal = signal(this.userIsLoggedIn());
    this.userIsLoggedIn$ = toObservable(this.userIsLoggedInSignal);
  }

  public userIsLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public userIsAdmin(): boolean {
    return localStorage.getItem("role") === "ADMIN";
  }

  public login(username: string, password: string) {
    return this.http.post("http://localhost:8080/api/login", {username, password}, {observe: 'response'})
      .pipe(tap({
        next: response => this.onLogin(response),
        error: () => {
          console.error("Invalid Login");
          this.userIsLoggedInSignal.set(false);
        }
      }));
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.userIsLoggedInSignal.set(false);
    this.router.navigate(["home"]);
  }

  private onLogin(response: HttpResponse<any>): void {
    const token = response?.headers.get("Authorization");
    if (token) {
      localStorage.setItem("token", token);
      this.getUserRole();
    } else {
      console.error("No token in authorization");
      this.userIsLoggedInSignal.set(false);
    }
  }

  private getUserRole() {
    this.userService.getCurrentUser().subscribe(userData => {
      localStorage.setItem("role", userData.role);
      this.userIsLoggedInSignal.set(true);
    });
  }
}
