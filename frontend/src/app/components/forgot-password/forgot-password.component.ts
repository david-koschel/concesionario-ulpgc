import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from '@angular/router';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService]
})

export class ForgotPasswordComponent implements OnInit{
  private mail : string = "";

  forgotUsername!: string;
  loading = false;
  forgotPasswordForm!: FormGroup;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }


  forgotPassword() {
    this.forgotUsername = this.forgotPasswordForm.get("username")?.value;
    this.loading = true;
    this.userService.forgotPassword(this.forgotUsername).subscribe({
      next: () => {
        this.messageService.add({summary:`El usuario ${this.forgotUsername} ha recibido un correo, en caso de que este exista.`});
        this.forgotPasswordForm.reset();
      },
      error: err => {
        if (err.status === 410) {
          this.messageService.add({summary: "Este usuario ya ha restablecido su contraseña recientemente. Inténtelo más tarde."});
        } else {
          this.messageService.add({summary: "No ha sido posible enviar un correo. Inténtelo más tarde."});
        }
        this.loading = false;
      }
    });
  }

  private initializeForm() {
    this.forgotPasswordForm = this.formBuilder.group(
      {
        username: ["", Validators.required]
      }
    )
  }
}
