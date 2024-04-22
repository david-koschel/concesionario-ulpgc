import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  protected forgotPasswordForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
  })

  recuperarContrasenia(){
    if(this.forgotPasswordForm.controls.email.value != null) {
      this.userService.sendEmail(this.forgotPasswordForm.controls.email.value);
    }
    window.location.href = '/login-register';
  }
}
