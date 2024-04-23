import {Component, inject, OnInit} from '@angular/core';
import {CatalogueComponent} from '../catalogue/catalogue.component';
import {ConfigurableVehicle} from '../../models/configurable-vehicle/configurable-vehicle.model';
import {VehicleService} from '../../services/vehicle.service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurableVehicleEngine} from "../../models/configurable-vehicle/configurable-vehicle-engine.model";
import {ConfigurableVehicleColor} from "../../models/configurable-vehicle/configurable-vehicle-color.model";
import {ConfigurableVehicleRim} from "../../models/configurable-vehicle/configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "../../models/configurable-vehicle/configurable-vehicle-extra.model";
import {LoginService} from "../../security/login.service";
import {ConfiguredVehicle} from "../../models/configurable-vehicle/configured-vehicle.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-vehicle-configuration',
  standalone: true,
  imports: [CatalogueComponent, CommonModule, ButtonModule, DialogModule, ConfirmDialogModule],
  templateUrl: './vehicle-configuration.component.html',
  styleUrl: './vehicle-configuration.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class VehicleConfigurationComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vehiculeService: VehicleService = inject(VehicleService);
  private loginService = inject(LoginService);
  private confirmationService = inject(ConfirmationService);

  private vehicleId!: number;

  protected vehicle!: ConfigurableVehicle;
  protected selectedEngine: ConfigurableVehicleEngine | undefined;
  protected selectedColor!: ConfigurableVehicleColor;
  protected selectedRim: ConfigurableVehicleRim | undefined;
  protected selectedExtras: ConfigurableVehicleExtra[] = [];

  selectButton!: string;
  visible = false;
  dialogHeader!: string;
  dialogText!: string;

  ngOnInit(): void {
    this.vehicleId = +this.route.snapshot.params['id'];
    this.getVehicle();
  }

  private getVehicle() {
    this.vehiculeService.getVehiculeById(this.vehicleId).subscribe({
      next: res => {
        this.selectedColor = res.colors[0];
        this.vehicle = res;
        this.checkForOngoingConfiguration();
      }
    });
  }

  checkForOngoingConfiguration() {
    const configuration = this.sessionRetrieveConfiguredVehicle();
    if (this.route.snapshot.queryParams["continue"] && configuration) {
      this.selectedEngine = this.vehicle.engines.find(engine => engine.id === configuration.selectedEngine);
      this.selectedColor = this.vehicle.colors.find(color => color.id === configuration.selectedColor)!;
      this.selectedRim = this.vehicle.rims.find(rim => rim.id === configuration.selectedRim);
      this.selectedExtras = this.vehicle.extras.filter(extra => configuration.selectedExtras.includes(extra.id));
      setTimeout(() => this.selectedButton('summaryOption'));
    } else {
      setTimeout(() => this.selectedButton('engineOption'));
    }
  }

  selectedButton(button: string) {
    const buttons = document.querySelectorAll('.selectorButton');
    buttons.forEach(btn => btn.classList.remove('selected'));

    this.selectButton = button;
    document.querySelector(`.selectorButton[class*="${button}"]`)?.classList.add('selected');
  }

  selectExtra(extra: ConfigurableVehicleExtra) {
    if (this.selectedExtras.includes(extra)) {
      this.selectedExtras.splice(this.selectedExtras.indexOf(extra), 1);
    } else {
      this.selectedExtras.push(extra);
    }
  }

  getTotalPrice() {
    return this.vehicle.basePrice +
      (this.selectedRim?.price || 0) +
      (this.selectedEngine?.price || 0) +
      this.selectedColor.price! +
      this.selectedExtras.reduce((total, extra) => total + extra.price, 0);
  }

  saveConfiguration() {
    if (this.formIsValid()) {
      const configuredVehicle: ConfiguredVehicle = {
        selectedVehicle: this.vehicle,
        selectedColor: this.selectedColor,
        selectedEngine: this.selectedEngine!,
        selectedRim: this.selectedRim!,
        selectedExtras: this.selectedExtras
      };
      if (this.loginService.userIsLoggedIn()) {
        this.vehiculeService.saveVehicle(configuredVehicle)
          .subscribe(() => this.router.navigate(["user"])
            .then(() => {
              this.sessionRemoveConfiguredVehicle();
              setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 200);
            })
          );
      } else {
        this.confirmationService.confirm({
          accept: () => this.goToLogin(configuredVehicle)
        });
      }
    }
  }

  private goToLogin(configuredVehicle: ConfiguredVehicle) {
    this.sessionSaveConfiguredVehicle(configuredVehicle);
    this.router.navigate(
      ["login-register"],
      {queryParams: {configuration: configuredVehicle.selectedVehicle.id}}
    );
  }

  private sessionSaveConfiguredVehicle(configuredVehicle: ConfiguredVehicle) {
    const configuredVehicleIds = {
      selectedVehicleId: configuredVehicle.selectedVehicle.id,
      selectedColor: configuredVehicle.selectedColor.id,
      selectedEngine: configuredVehicle.selectedEngine.id,
      selectedRim: configuredVehicle.selectedRim.id,
      selectedExtras: configuredVehicle.selectedExtras.map(extra => extra.id)
    };
    sessionStorage.setItem("configured-vehicle", JSON.stringify(configuredVehicleIds));
  }

  private sessionRetrieveConfiguredVehicle() {
    return JSON.parse(sessionStorage.getItem("configured-vehicle")!);
  }

  private sessionRemoveConfiguredVehicle() {
    sessionStorage.removeItem("configured-vehicle");
  }

  formIsValid() {
    return this.selectedEngine && this.selectedRim && this.selectedColor;
  }

  showDialog(header: string, text: string) {
    this.dialogHeader = header;
    this.dialogText = text;
    this.visible = true;
  }
}

