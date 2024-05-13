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
  rentService: RentService = inject(RentService);
  vehicles: RentVehicle[] = [];
  rentDays: number = 0;
  fechaRecogidaString: string = "";
  fechaLlegadaString: string = "";
  onBuscarVehiculosDisponibles(eventData: { fechaRecogida: Date, fechaLlegada: Date }) {
    this.fechaRecogidaString = eventData.fechaRecogida.toISOString().slice(0, 10);;
    this.fechaLlegadaString = eventData.fechaLlegada.toISOString().slice(0, 10);;

    console.log('Fecha de recogida:', this.fechaRecogidaString);
    console.log('Fecha de llegada:', this.fechaLlegadaString);

    this.vehicles = this.rentService.getVehiculosDisponibles(this.fechaRecogidaString, this.fechaLlegadaString);
    this.rentDays = this.rentService.calcularDiferenciaEnDias(this.fechaRecogidaString, this.fechaLlegadaString);
    this.dateSelected = true;
  }
}
