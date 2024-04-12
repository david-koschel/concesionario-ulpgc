import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/user/current");
  }

  public updatedCurrentUser(user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/api/user/current", user);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/api/user/all");
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/user/single/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/api/user/update", user);
  }

  public addUser(user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/api/user/current", user);
  }

}
