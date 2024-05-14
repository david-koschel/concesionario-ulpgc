import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";
import {ForgotPassword} from "./forgot-password.model";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [
    PasswordModule,
    FormsModule,
    ButtonModule,
    CardModule
  ],
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  token!: string;

  password: string = "";
  repeat!: string;

  passwordRegex: RegExp = /^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\d)(?!.*\s).{8,}$/;

  may: RegExp = /.*[A-ZÑ].*/;
  min: RegExp = /.*[a-zñ].*/;
  dig: RegExp = /.*\d.*/;
  space: RegExp = /^\S*$/;
  len: RegExp = /.{8,}/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  checkPasswordRegex(regex: RegExp) {
    return this.password.match(regex) ? 'green' : 'red';
  }

  resetPassword() {
    if (this.password === this.repeat && this.password.match(this.passwordRegex)) {
      this.loading = true;
      const dto: ForgotPassword = {token: this.token, newPassword: this.password, newPasswordRepeat: this.repeat};
      this.userService.resetPassword(dto).subscribe({
        next: () => {
          this.messageService.add({summary: "La contraseña ha sido cambiada con éxito"});
          this.router.navigate(["home"]).then();
        },
        error: (err: { status: number; }) => {
          if (err.status === 410) this.messageService.add({summary: "Este link no es válido o ya ha expirado."});
          else this.messageService.add({summary: "Este link no es válido o ya ha expirado."});
          this.loading = false;
        }
      });
    }
  }

}
