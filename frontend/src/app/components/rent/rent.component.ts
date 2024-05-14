import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../../services/rent.service';
import { RentVehicleComponent } from '../rent-vehicle/rent-vehicle.component';
import { RentVehicle } from '../../models/rent-vehicle';
import { RentDateComponent } from '../rent-date/rent-date.component';
import { RentVehiclePriceComponent } from '../rent-vehicle-price/rent-vehicle-price.component';

@Component({
    selector: 'app-rent',
    standalone: true,
    templateUrl: './rent.component.html',
    styleUrls: ['./rent.component.scss'],
    imports: [CommonModule, RentDateComponent, RentVehicleComponent, RentVehiclePriceComponent]
})
export class RentComponent {
  dateSelected: boolean = false;
  vehicles!: RentVehicle[];
  rentDays: number = 0;
  fechaRecogidaString: string = "";
  fechaLlegadaString: string = "";

  public constructor(
    private rentService: RentService
  ) {
  }

  getAvailability(eventData: {startDate: Date, endDate: Date}) {

    this.rentService.getFreeVehicles(eventData.startDate, eventData.endDate).subscribe(
      vehicles => this.vehicles = vehicles
    )

    this.rentDays = this.rentService.calculateDays(eventData.startDate, eventData.endDate);
    this.dateSelected = true;
  }
}
