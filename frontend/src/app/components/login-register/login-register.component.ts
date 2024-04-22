import {Component, inject} from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {User} from "../../models/user.model";
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {LoginService} from "../../security/login.service";
import {MessageService} from "primeng/api"; // Importa CommonModule
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-register-arreglado',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, CheckboxModule, ToastModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
  providers: [MessageService]
})


export class LoginRegisterArregladoComponent {

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  protected loginForm = this.formBuilder.group({
    loginName: ['', [Validators.required]],
    loginPassword: ['', Validators.required]
  })
  protected registerForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    address: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
    isAdmin: [false]
  })


  submitForm() {
    if (this.registerForm.valid) {
      const isAdmin = this.registerForm.get("isAdmin")?.value;
      const user: User = <User>{...this.registerForm.value, role: isAdmin ? "ADMIN" : "CUSTOMER"};
      this.userService.registerUser(user).subscribe({
        next: res => {
          this.loginService.login(
            String(this.registerForm.controls['username'].value),
            String(this.registerForm.controls['password'].value)
          ).then(() => {
            window.location.href = '/home';
          });
        },
        error: err => this.messageService.add({
          summary: "Error al guardar el usuario",
          detail: err.error.message || "Vuelva a intentarlo más tarde",
          severity: "error"
        }),
      });
    } else {
      this.messageService.add({
        summary: "Rellene correctamente todos los campos",
        severity: "error"
      });
    }
  }

  ocultarMostrar(selector: any, selector2: any, selector3: any, selector4: any) {
    var elemento = document.querySelector(selector);
    var elemento2 = document.querySelector(selector2);
    var elemento3 = document.querySelector(selector3);
    var elemento4 = document.querySelector(selector4);
    if (elemento != null) {
      elemento.style.display = 'none';
    }
    if (elemento2 != null) {
      elemento2.style.display = 'flex';
    }
    if (elemento3 != null) {
      elemento3.style.display = 'none';
    }
    if (elemento4 != null) {
      elemento4.style.display = 'block';
    }
  }


  submitLoginForm() {
    this.loginService.login(
      String(this.loginForm.controls['loginName'].value),
      String(this.loginForm.controls['loginPassword'].value)
    ).then(() => {
      window.location.href = '/home';
    })
      .catch(error => {
        if(!this.loginService.userIsLoggedIn()){
          this.messageService.add({
            summary: "Usuario o contraseña incorrectos",
            severity: "error"
          });
        }
        console.error("La promesa fue rechazada:", error);
      });

  }
}




