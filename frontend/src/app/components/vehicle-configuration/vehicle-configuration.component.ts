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
import {UserConfiguration} from "../../models/configurable-vehicle/configured-vehicle.model";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-vehicle-configuration',
  standalone: true,
  imports: [CatalogueComponent, CommonModule, ButtonModule, DialogModule],
  templateUrl: './vehicle-configuration.component.html',
  styleUrl: './vehicle-configuration.component.scss',
  providers: [DialogService]
})
export class VehicleConfigurationComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vehiculeService: VehicleService = inject(VehicleService);
  private loginService = inject(LoginService);

  private vehicleId!: number;

  protected vehicle!: ConfigurableVehicle;
  protected selectedEngine: ConfigurableVehicleEngine | undefined;
  protected selectedColor!: ConfigurableVehicleColor;
  protected selectedRim: ConfigurableVehicleRim | undefined;
  protected selectedExtras: ConfigurableVehicleExtra[] = [];

  selectButton: string = "engine";
  visible = false;
  dialogHeader!: string;
  dialogText!: string;

  ngOnInit(): void {
    this.vehicleId = +this.route.snapshot.params['id'];
    this.getVehicle();
    this.selectedButton('engineOption');
  }

  private getVehicle() {
    this.vehiculeService.getVehiculeById(this.vehicleId).subscribe({
      next: res => {
        this.selectedColor = res.colors[0];
        this.vehicle = res;
      }
    });
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
      if (this.loginService.userIsLoggedIn()) {
        const configuredVehicle: UserConfiguration = {
          selectedVehicle: this.vehicle,
          selectedColor: this.selectedColor,
          selectedEngine: this.selectedEngine!,
          selectedRim: this.selectedRim!,
          selectedExtras: this.selectedExtras
        };
        this.vehiculeService.saveVehicle(configuredVehicle)
          .subscribe(() => this.router.navigate(["user"])
            .then(() => setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 200))
          );
      } else {
        console.log("user is not logged in");
      }
    }
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

