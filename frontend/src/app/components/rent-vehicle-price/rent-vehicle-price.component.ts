import {Component, inject, Input, ViewChild} from '@angular/core';
import {RentService} from "../../services/rent.service";
import {TpvFormComponent} from "../tpv-form/tpv-form.component";
import {RentRequest} from "../../models/rent-request.model";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-rent-vehicle-price',
  standalone: true,
  imports: [
    TpvFormComponent,
    DatePipe,
    ButtonModule
  ],
  templateUrl: './rent-vehicle-price.component.html',
  styleUrl: './rent-vehicle-price.component.scss',
  providers: [MessageService]
})
export class RentVehiclePriceComponent {

  @Input() rentDays!: number;
  @Input() vehicle: any;
  @Input() fechaRecogidaString!: Date;
  @Input() fechaLlegadaString!: Date;

  @ViewChild("tpvForm")
  tpvForm!: TpvFormComponent;

  private rentService = inject(RentService);
  private messageService = inject(MessageService);

  loading = false;

  rent() {
    this.loading = true;
    const rentRequest: RentRequest = {
      endDate: this.fechaLlegadaString,
      startDate: this.fechaRecogidaString,
      rentVehicle: this.vehicle
    };
    this.rentService.rentVehicle(rentRequest).subscribe({
      next: res => {
        this.tpvForm.submitData(res);
      }, error: () => {
        this.messageService.add({
          summary: "Error",
          detail: "Error al crear el alquiler",
          severity: "error"
        });
        this.loading = false;
      }
    });
  }
}
