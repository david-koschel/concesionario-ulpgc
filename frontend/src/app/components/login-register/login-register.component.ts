import {Component, OnInit} from '@angular/core';
import {DividerModule} from "primeng/divider";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    DividerModule,
    FloatLabelModule,
    NgIf,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent implements OnInit{
  submitted: boolean = false;
  loading: boolean = false;
  register: boolean = false;

  loginForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submit(){}
}
