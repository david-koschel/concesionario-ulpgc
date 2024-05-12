import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
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
  private formBuilder = inject(FormBuilder);
  private mail : string = "";
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  protected forgotPasswordForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
  })
  protected restorePasswordForm = this.formBuilder.group({
    password: ["", [Validators.required, Validators.email]],
  })

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      var elemento = document.querySelector('#forgotPassword') as HTMLElement;
      var elemento2 = document.querySelector('#restorePassword') as HTMLElement;
      this.mail = email;
      if (email!= null) {
        if(elemento && elemento2){
          elemento.style.display = 'none';
          elemento2.style.display = 'flex';
        }
      } else {
        if(elemento && elemento2){
          elemento.style.display = 'flex';
          elemento2.style.display = 'none';
        }
      }
    });
  }

  recuperarContrasenia(){
    if(this.forgotPasswordForm.valid && this.forgotPasswordForm.controls.email.value != null) {
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: "Se ha enviado el correo para restaurar contraseña"});
      this.userService.sendEmail(this.forgotPasswordForm.controls.email.value);
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "Introduzca un correo valido"});
    }
  }
  validarContrasenia(contrasenia: string): boolean {
    const longitudMinima = 8;
    if (contrasenia.length < longitudMinima) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "La contraseña debe tener al menos una longitud de 8 caracteres"});
      return false;
    }
    if (!/\d/.test(contrasenia)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "La contraseña debe contener al menos un caracter numerico"});
      return false;
    }
    if (!/[A-Z]/.test(contrasenia)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "La contraseña debe contener al menos un caracter en mayuscula"});
      return false;
    }
    if (!/[a-z]/.test(contrasenia)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "La contraseña debe contener al menos un caracter en minuscula"});
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(contrasenia)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "La contraseña debe contener al menos un caracter especial"});
      return false;
    }
    this.messageService.add({severity: 'success', summary: 'Éxito', detail: "Contraseña modificada con exito"});
    return true;
  }


  restorePassword() {
    if(this.restorePasswordForm.controls.password.value != null && this.validarContrasenia(this.restorePasswordForm.controls.password.value )){
      this.userService.restorePassword(this.mail, this.restorePasswordForm.controls.password.value);
    }
  }
}
