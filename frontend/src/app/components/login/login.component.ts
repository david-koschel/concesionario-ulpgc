import {Component, inject} from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {LoginService} from "../../security/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);


  protected loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  })
  submitForm(){
    this.loginService.login(
      String(this.loginForm.controls['username'].value),
      String(this.loginForm.controls['password'].value)
    );

  }
  constructor(private fb: FormBuilder){}
  get username() {
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
}
