import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactMessage} from "../components/contact-messages/contactMessage.model";

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {

  constructor(private http: HttpClient) { }

  public getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>("http://localhost:8080/api/contact_message/all")
  }
}

