import {Component, inject} from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserService } from "../../service/user.service";
import { CommonModule } from '@angular/common';
import {User} from "../../models/user.model";
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {LoginService} from "../../security/login.service";
import {MessageService} from "primeng/api"; // Importa CommonModule

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
      this.userService.registerUser(user).subscribe();
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
    console.log(elemento);
    if (elemento != null) {
      elemento.style.display = 'none';
    }
    console.log(elemento2);
    if (elemento2 != null) {
      elemento2.style.display = 'flex';
    }
    console.log(elemento3);
    if (elemento3 != null) {
      elemento3.style.display = 'none';
    }
    console.log(elemento4);
    if (elemento4 != null) {
      elemento4.style.display = 'block';
    }
  }


  submitLoginForm() {
    this.loginService.login(
      String(this.loginForm.controls['loginName'].value),
      String(this.loginForm.controls['loginPassword'].value)
    );
  }
}




