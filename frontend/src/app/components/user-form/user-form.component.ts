import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  private userId!: number;
  protected userCardRows: { name: string; value: string; formControl: string }[] = [];
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
      password: [user.password, Validators.required]
    })
  }

  startNewForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  submitForm() {
    for (let controlsKey in this.form.controls) {
      const control = this.form.controls[controlsKey];
      if (control.invalid) control.markAsDirty();
    }

    if (this.form.valid) {
      const user: User = {...this.form.value};
      if (this.userId) {
        user.id = this.userId;
        this.updateUser(user)
      } else {
        this.saveUser(user)
      }
    }
  }

  private updateUser(user: User) {
    this.userService.updateUser(user);
  }

  private saveUser(user: User) {
    this.userService.addUser(user);
  }
}
