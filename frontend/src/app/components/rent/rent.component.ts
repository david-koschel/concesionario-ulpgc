import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../../services/rent.service';
import { RentVehicleComponent } from '../rent-vehicle/rent-vehicle.component';
import { RentVehicle } from '../../models/rent-vehicle';
import { RentDateComponent } from '../rent-date/rent-date.component';
import { RentVehiclePriceComponent } from '../rent-vehicle-price/rent-vehicle-price.component';
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-rent',
    standalone: true,
    templateUrl: './rent.component.html',
    styleUrls: ['./rent.component.scss'],
  imports: [CommonModule, RentDateComponent, RentVehicleComponent, RentVehiclePriceComponent, RouterLink]
})
export class RentComponent {
  dateSelected: boolean = false;
  vehicles!: RentVehicle[];
  rentDays: number = 0;
  fechaRecogidaString!: Date;
  fechaLlegadaString!: Date;

  public constructor(
    private rentService: RentService) {
  }

  getAvailability(eventData: {startDate: Date, endDate: Date}) {

    this.rentService.getFreeVehicles(this.formatDates(eventData.startDate), this.formatDates(eventData.endDate)).subscribe(
      vehicles => {
        this.vehicles = vehicles
      }
    )

    this.rentDays = this.rentService.calculateDays(eventData.startDate, eventData.endDate);
    this.fechaRecogidaString = eventData.startDate;
    this.fechaLlegadaString = eventData.endDate;
    this.dateSelected = true;
  }

  private formatDates(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
  }


  protected readonly location = location;
}
