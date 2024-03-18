import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  constructor(private fb: FormBuilder){
    
  }
  get name() {
    return this.registerForm.controls['name'];
  }

  get apellidos(){
    return this.registerForm.controls['apellidos'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
