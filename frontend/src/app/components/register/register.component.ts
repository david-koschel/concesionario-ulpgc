import {Component, inject} from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserService } from "../../service/user.service";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {tap} from "rxjs"; // Importa CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  protected userId!: number;

  protected registerForm = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', Validators.required],
    email: ['', [Validators.required]],
    password: ['', Validators.required],
    username: ['', Validators.required]
  })

  submitForm(){
    const user: User = <User>{...this.registerForm.value};
    this.userService.registerUser(user).subscribe();
  }

  constructor(private fb: FormBuilder){

  }
  get name() {
    return this.registerForm.controls['name'];
  }

  get address(){
    return this.registerForm.controls['address'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }
}
