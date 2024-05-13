import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {VehicleService} from "../../services/vehicle.service";
import {UserConfiguration} from "../../models/configurable-vehicle/configured-vehicle.model";
import {RouterLink} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";
import {UserVehicle} from "../../models/user-vehicle.model";
import { IndependentExtra } from '../../models/independentextra.model';
import { ExtraService } from '../../services/extra.service';
import {VehiclePaymentStatusPipe} from "./vehicle-payment-status.pipe";
import {TpvFormComponent} from "../tpv-form/tpv-form.component";

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
    RouterLink,
    SidebarModule,
    VehiclePaymentStatusPipe,
    TpvFormComponent
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
  private extraService = inject(ExtraService)

  protected editing: boolean = false;

  protected userCardRows: { name: string; value: string; formControl?: string }[] = [];
  protected userVehicles: UserVehicle[] = [];
  protected userConfigurations: UserConfiguration[] = [];

  protected form!: FormGroup;
  protected formLoading = false;

  private user!: User;


  sidebarVisible: boolean = false;

  currentExtrasPrice: any;
  currentTotalPrice: any;
  selectedConfig: UserConfiguration | undefined;
  purchaseLoading = false;

  @ViewChild("tpvForm")
  tpvForm!: TpvFormComponent;


  protected userExtras: IndependentExtra[] =[];


  ngOnInit(): void {
    this.getUserData();
    this.getUserVehicles();
    this.getUserExtras();
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
    this.vehicleService.getUserVehicles().subscribe(res => this.userVehicles = res);
  }

////
  private getUserExtras(){
    this.extraService.getUserExtras().subscribe(data => this.userExtras = data)
  }
////


  private getUserConfigurations() {
    this.vehicleService.getUserConfigurations().subscribe(res => this.userConfigurations = res);
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

  showDialog(userConfig: UserConfiguration): void {
    this.selectedConfig = userConfig;
    this.sidebarVisible = true;


    this.currentExtrasPrice = userConfig.selectedExtras.reduce((total, extra) => total + extra.price, 0);

    this.currentTotalPrice = userConfig.selectedVehicle.basePrice +
      userConfig.selectedRim.price +
      userConfig.selectedEngine.price +
      userConfig.selectedColor.price! +
      this.currentExtrasPrice;
  }

  paymentConfirmed(): void {
    this.purchaseLoading = true;
    this.vehicleService.buyConfiguration(this.selectedConfig!.id!).subscribe((res) => {
      this.tpvForm.submitData(res);
      this.purchaseLoading = false;
      this.sidebarVisible = false;
      this.selectedConfig = undefined;
      this.getUserVehicles();
      this.getUserConfigurations();
    });
  }

  paymentCancelled(): void {
    this.sidebarVisible = false;
  }

  protected continuePayment(id: number) {
    this.vehicleService.continueVehiclePurchase(id).subscribe(res => this.tpvForm.submitData(res));
  }
}
