import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../models/blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>("http://localhost:8080/api/blog/all");
  }

  getById(blogId: string): Observable<Blog> {
    return this.http.get<Blog>(`http://localhost:8080/api/blog/${blogId}`);
  }

  getByIdPublic(id: string): Observable<Blog> {
    return this.http.get<Blog>(`http://localhost:8080/api/blog/public/id/${id}`);
  }

  getPublicAllBeforeToday(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`http://localhost:8080/api/blog/public/show`);
  }

  update(blog: Blog) : any {
    return this.http.put<Blog>(`http://localhost:8080/api/blog/${blog.id}`, blog);
  }

  save(blog: Blog) : Observable<Blog> {
    return this.http.post<Blog>("http://localhost:8080/api/blog", blog);
  }

  subscribeToNewsletter(email: string): Observable<void> {
    return this.http.post<void>(`http://localhost:8080/api/blog/public/newsletter`, email);
  }
}
