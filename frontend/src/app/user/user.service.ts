import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/user/current");
  }

  //PETICIONES DE PRUEBA

  public getUsers() {
    return this.http.get("http://localhost:8080/api/user/all");
  }

  public getUserById(id: number) {
    return this.http.get(`http://localhost:8080/api/user/single/${id}`);
  }
}
