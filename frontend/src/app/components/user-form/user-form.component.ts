import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user.model";
import { NgIf } from "@angular/common";
import { CheckboxModule } from "primeng/checkbox";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { tap } from "rxjs";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
    CheckboxModule,
    ToastModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  providers: [MessageService]
})
export class UserFormComponent implements OnInit {

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  protected userId!: number;
  protected form!: FormGroup;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("userId")!;
    if (userId === "new") {
      this.startNewForm();
    } else if (userId /*&& !isNaN(+userId)*/) {
      this.userId = +userId;
      this.userService.getUserById(this.userId).subscribe(user => this.startEditForm(user))
    }
  }

  startEditForm(user: User) {
    this.form = this.formBuilder.group({
      name: [user.name, Validators.required],
      email: [user.email, Validators.email],
      address: [user.address, Validators.required],
      username: [user.username, Validators.required],
      password: [user.password, Validators.required],
      isAdmin: [user.role === "ADMIN"]
    })
  }

  startNewForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      isAdmin: [false]
    })
  }

  submitForm() {
    for (let controlsKey in this.form.controls) {
      const control = this.form.controls[controlsKey];
      if (control.invalid) control.markAsDirty();
    }

    if (this.form.valid) {
      const isAdmin = this.form.get("isAdmin")?.value;
      const user: User = {...this.form.value, role: isAdmin ? "ADMIN" : "CUSTOMER"};
      this.addOrUpdateUser(user).subscribe({
        next: res => {
          this.messageService.add({
            summary: "Usuario guardado con éxito",
            severity: "success"
          });
        },
        error: err => this.messageService.add({
          summary: "Error al guardar el usuario",
          detail: err.error.message || "Vuelva a intentarlo más tarde",
          severity: "error"
        }),
      })
    }
  }

  addOrUpdateUser(user: User) {
    if (this.userId) {
      user.id = this.userId;
      return this.userService.updateUser(user)
    } else {
      return this.userService.addUser(user).pipe(
        tap({
          next: user => {
            this.userId = user.id!;
            this.router.navigate(
              [`user-form/${user.id}`],
              {replaceUrl: true}
            );
          }
        })
      );
    }
  }
}
