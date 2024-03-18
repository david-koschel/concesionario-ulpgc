import {Component, OnInit} from '@angular/core';
import {ContactMessageService} from "../../service/contact-message.service";
import {ContactMessage} from "./contactMessage.model";
import {CheckboxModule} from "primeng/checkbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RouterLink} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [
    CheckboxModule,
    ConfirmDialogModule,
    RouterLink,
    SidebarModule,
    FloatLabelModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit{

  messages: ContactMessage[] = [];
  currentMessage: ContactMessage | undefined;
  sidebarVisible: boolean = false;

  showAnswerForm: boolean = false;
  answerForm!: FormGroup;
  submitted: boolean = false;

  public constructor(
    private contactMessageService: ContactMessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }


  private getMessages() {
    this.contactMessageService.getContactMessages().subscribe(
      contactMessages => this.messages = contactMessages
    );
  }

  markAllAsRead() {
    for (let i = 0; i < this.messages.length; i++) {
      this.messages[i].answered = true
    }
  }

  markAsRead(message: ContactMessage) {
    for (let i = 0; i < this.messages.length; i++) {
      if (message == this.messages[i]){this.messages[i].answered = !message.answered;}
    }
  }

  deleteMessage(message: ContactMessage) {
    for (let i = 0; i < this.messages.length; i++) {
      if (message == this.messages[i]){this.messages.splice(i, 1)}
    }
  }

  openMessage(message: ContactMessage){
    this.currentMessage = message;
    this.markAsRead(message);
    this.sidebarVisible = true;
  }

  get f() {
    return this.answerForm.controls;
  }

  submit() {
    this.submitted = true;
  }

  protected initializeForm() {
    this.answerForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
}
