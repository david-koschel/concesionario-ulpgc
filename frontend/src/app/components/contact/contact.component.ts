import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { FloatLabelModule } from 'primeng/floatlabel';
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {NgIf} from "@angular/common";
import {ContactMessageService} from "../../service/contact-message.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    StyleClassModule,
    CheckboxModule,
    ButtonModule,
    ProgressSpinnerModule,
    NgIf,
    ToastModule
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.scss',
  providers: [MessageService]
})
export class ContactComponent implements OnInit{

  contactForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactMessageService: ContactMessageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  submit() {
    this.submitted = true;
    if(this.contactForm.valid){
      this.loading = true;
      const message = {...this.contactForm.value}
      this.contactMessageService.sendContactMessage(message).subscribe({
        next: () => this.onSuccessfulAnswer(),
        error: () => this.onUnsuccessfulAnswer()
      });
    }
  }

  private onSuccessfulAnswer() {
    this.loading = false;
    this.messageService.add({summary: 'Éxito', detail: 'Se ha enviado correctamente su mensaje', severity: 'success'});
    this.contactForm.reset();
    this.submitted = false;
  }

  private onUnsuccessfulAnswer() {
    this.loading = false;
    this.messageService.add({summary: 'Error', detail: 'No se ha podido enviar su mensaje, vuelva a intentarlo', severity: 'error'});
  }
}
