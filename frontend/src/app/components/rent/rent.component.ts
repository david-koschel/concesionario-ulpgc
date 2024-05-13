import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../../services/rent.service';
import { RentVehicleComponent } from '../rent-vehicle/rent-vehicle.component';
import { RentVehicle } from '../../models/rent-vehicle';
import { RentDateComponent } from '../rent-date/rent-date.component';

@Component({
    selector: 'app-rent',
    standalone: true,
    templateUrl: './rent.component.html',
    styleUrls: ['./rent.component.scss'],
    imports: [CommonModule, RentDateComponent, RentVehicleComponent]
})
export class RentComponent {
  dateSelected: boolean = false;
  rentService: RentService = inject(RentService);
  vehicles: RentVehicle[] = [];
  rentDays: number = 0;

  onBuscarVehiculosDisponibles(eventData: { fechaRecogida: Date, fechaLlegada: Date }) {
    const fechaRecogidaString = eventData.fechaRecogida.toISOString().slice(0, 10);;
    const fechaLlegadaString = eventData.fechaLlegada.toISOString().slice(0, 10);;

    console.log('Fecha de recogida:', fechaRecogidaString);
    console.log('Fecha de llegada:', fechaLlegadaString);

    this.vehicles = this.rentService.getVehiculosDisponibles(fechaRecogidaString, fechaLlegadaString);
    this.rentDays = this.rentService.calcularDiferenciaEnDias(fechaRecogidaString, fechaLlegadaString);
    this.dateSelected = true;
  }
}
