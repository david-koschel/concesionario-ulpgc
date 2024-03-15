import {Component, OnInit} from '@angular/core';
import {ContactMessageService} from "../../service/contact-message.service";
import {ContactMessage} from "./contactMessage.model";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [
    CheckboxModule
  ],
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit{

  messages: ContactMessage[] = [];

  public constructor(private contactMessageService: ContactMessageService) {
  }

  ngOnInit(): void {
    this.getMessages();
  }


  private getMessages() {
    this.contactMessageService.getContactMessages().subscribe(
      contactMessages => this.messages = contactMessages
    );
    console.log(this.messages);
  }
}
