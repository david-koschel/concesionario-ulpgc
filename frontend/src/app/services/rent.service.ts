import { Injectable } from '@angular/core';
import { RentVehicle } from '../models/rent-vehicle';
@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor() { }

  VEHICULOS_EJEMPLO: RentVehicle[] = [
    {
      make: 'Toyota',
      model: 'Corolla',
      engine: '194cv',
      price: 50,
      dates: ['15-06-2024', '16-06-2024', '17-06-2024']
    },
    {
      make: 'Ford',
      model: 'Mustang',
      engine: '200cv',
      price: 70,
      dates: ['15-06-2024', '16-06-2024', '17-06-2024']
    }
  ];
}
