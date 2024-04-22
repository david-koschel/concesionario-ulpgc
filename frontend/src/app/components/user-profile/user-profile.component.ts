import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {VehicleService} from "../../services/vehicle.service";
import {ConfiguredVehicle} from "../../models/configurable-vehicle/configured-vehicle.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    NgIf,
    NgForOf,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InputTextModule,
    NgClass,
    ToastModule,
    RouterLink
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [MessageService]
})
export class UserProfileComponent implements OnInit {

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private vehicleService = inject(VehicleService);

  protected editing: boolean = false;

  protected userCardRows: { name: string; value: string; formControl?: string }[] = [];
  protected userVehicles: { model: string; status: string; image: string; }[] = [];
  protected userConfigurations: ConfiguredVehicle[] = [];

  protected form!: FormGroup;
  protected formLoading = false;

  private user!: User;

  ngOnInit(): void {
    this.getUserData();
    this.getUserVehicles();
    this.getUserConfigurations();
  }

  private getUserData() {
    this.userService.getCurrentUser().subscribe(user => this.updateUserCardInfo(user));
  }

  private updateUserCardInfo(user: User) {
    this.user = user;
    this.userCardRows = [
      {name: "Nombre", value: user.name, formControl: "name"},
      {name: "Correo electrónico", value: user.email, formControl: "email"},
      {name: "Dirección", value: user.address, formControl: "address"},
      {name: "Nombre de usuario", value: user.username, formControl: "username"},
      {name: "Contraseña", value: '********'}
    ];
  }

  private getUserVehicles() {
    this.userVehicles = [
      {model: "Skoda Enyaq 60", status: "Comprado", image: "assets/Skoda_Enyaq_iv_60.jpg"},
      {model: "Renault Scenic", status: "Comprado", image: "assets/mockups/car_blue.png"},
      {model: "RS 6 Avant GT", status: "Comprado", image: "assets/mockups/car_red.png"},
      {model: "Lamborghini Urus", status: "Alquilado", image: "assets/lamborghiniurus.jpg"}
    ];
  }

  private getUserConfigurations() {
    this.vehicleService.getUserVehicles().subscribe(res => this.userConfigurations = res);
  }

  protected editProfile() {
    this.form = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      address: [this.user.address, Validators.required],
      username: [this.user.username, Validators.required]
    });
    this.editing = true;
  }

  protected cancel() {
    this.editing = false;
  }

  protected save() {
    if (this.form.valid) {
      this.formLoading = true;
      this.userService.updatedCurrentUser(this.form.value).subscribe({
        next: value => {
          this.updateUserCardInfo(value);
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Datos de usuario actualizados'});
          this.formLoading = false;
          this.editing = false;
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message || 'Error al actualizar los datos'
          });
          this.formLoading = false;
        }
      });
    }
  }
}
