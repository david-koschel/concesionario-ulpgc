import { Injectable } from '@angular/core';
import { RentVehicle } from '../models/rent-vehicle';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor() { }

  VEHICULOS_EJEMPLO: RentVehicle[] = [
    {
      id: 1,
      img: 'assets/toyota-corolla.jpg',
      make: 'Toyota',
      model: 'Corolla',
      year: '2022',
      engine: '1.4 de 194cv',
      price: 50,
      bookedSlots: ['2024-06-15', '2024-06-16', '2024-06-17']
    },
    {
      id: 2,
      img: 'assets/ford-mustang.jpg',
      make: 'Ford',
      model: 'Mustang',
      year: '2022',
      engine: '2.4 turbo de 200cv',
      price: 70,
      bookedSlots: ['2024-06-15', '2024-06-16', '2024-06-17']
    }
  ];

  getVehiculosDisponibles(fechaRecogida: string, fechaLlegada: string): RentVehicle[] {
    return this.VEHICULOS_EJEMPLO.filter(vehicle => {
      return !vehicle.bookedSlots.some(slot => this.isBetweenDates(slot, fechaRecogida, fechaLlegada));
    });
  }

  private isBetweenDates(date: string, startDate: string, endDate: string): boolean {
    const currentDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate.getTime() >= start.getTime() && currentDate.getTime() <= end.getTime();
  }

  calcularDiferenciaEnDias(fechaInicio: string, fechaFin: string): number {
    const fecha1 = moment(fechaInicio);
    const fecha2 = moment(fechaFin);
    const dias = fecha2.diff(fecha1, 'days');
    console.log(dias);
    return dias;
}



}
