import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    this.http.post("http://localhost:8080/api/login", {username, password}, {observe: 'response'})
      .subscribe({
        next: response => this.onLogin(response),
        error: () => console.error("Invalid Login")
      });
  }

  public logout() {
    localStorage.removeItem("token");
  }

  private onLogin(response: HttpResponse<any>) {
    const token = response?.headers.get("Authorization")
    if (token) {
      localStorage.setItem("token", token);
    } else {
      throw new Error("No token in authorization")
    }
  }
}
