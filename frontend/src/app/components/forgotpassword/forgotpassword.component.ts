import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  }) 
  constructor(private fb: FormBuilder){}
  get email() {
    return this.loginForm.controls['email'];
  }
}
