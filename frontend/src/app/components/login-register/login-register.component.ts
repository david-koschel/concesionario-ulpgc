import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {LoginService} from "../../security/login.service";
import {MessageService} from "primeng/api"; // Importa CommonModule
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login-register-arreglado',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, CheckboxModule, ToastModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
  providers: [MessageService]
})


export class LoginRegisterArregladoComponent implements OnInit {

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected loading = false;
  private configuredVehicle!: number;

  protected loginForm = this.formBuilder.group({
    loginName: ['', [Validators.required]],
    loginPassword: ['', Validators.required]
  });
  protected registerForm: FormGroup = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    address: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit() {
    this.subscribeToParams();
  }

  private subscribeToParams() {
    this.configuredVehicle = +this.route.snapshot.queryParams["configuration"];
    this.route.queryParams.pipe(map(query => !!query["register"])).subscribe(
      register => this.showLogin(!register));
  }

  submitForm() {
    if (this.registerForm.valid && this.validarContrasenia(this.registerForm.controls['password'].value)) {
      this.loading = true;
      const user: User = {...this.registerForm.value};
      this.userService.registerUser(user)
        .subscribe({
          next: res => {
            this.login(res.username, res.password);
            this.loading = false;
          },
          error: err => {
            this.messageService.add({
              summary: "Error al registrarse",
              detail: err.error.message || "Vuelva a intentarlo más tarde",
              severity: "error"
            });
            this.loading = false;
          }
        });
    } else {
      this.messageService.add({
        summary: "Error",
        detail: "Rellene correctamente todos los campos",
        severity: "error"
      });
    }
  }

  showLogin(login: boolean) {
    if (login) {
      this.changeForm('#slogins', '#sregistros', '#registros', '#logins');
    } else {
      this.changeForm('#sregistros', '#slogins', '#logins', '#registros'
      );
    }
  }

  changeForm(selector: any, selector2: any, selector3: any, selector4: any) {
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
    if (this.loginForm.valid) {
      this.login(
        this.loginForm.controls['loginName'].value!,
        this.loginForm.controls['loginPassword'].value!
      );
    } else {
      this.messageService.add({
        summary: "Error",
        detail: "Rellene correctamente todos los campos",
        severity: "error"
      });
    }
  }

  private login(username: string, password: string) {
    this.loginService.login(username, password).subscribe({
      next: () => this.successfulLogin(),
      error: () => {
        this.messageService.add({
          summary: "Error",
          detail: "Usuario o contraseña incorrectos",
          severity: "error"
        });
      }
    });
  }

  private successfulLogin() {
    if (this.configuredVehicle) {
      this.router.navigate(
        [`vehicle-configurator/${this.configuredVehicle}`],
        {queryParams: {continue: true}}
      );
    } else {
      this.router.navigate(["user"]);
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
}
