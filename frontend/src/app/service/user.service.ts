import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  //PETICIONES DE PRUEBA

  public getUsers() {
    return this.http.get("http://localhost:8080/api/user/all");
  }

  public getCurrentUser() {
    return this.http.get("http://localhost:8080/api/user/current");
  }

  public getUserById(id: number) {
    return this.http.get(`http://localhost:8080/api/user/single/${id}`);
  }
}
