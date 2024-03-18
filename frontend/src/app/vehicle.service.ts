import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
   vehicles: Vehicle[] = [
    {
      id: 1,
      Make: "Toyota",
      model: {
        name: "GR86",
        img: "URL Imagen Toyota GR86",
      },
      price: 30000,
      descripcion: "Un deportivo biplaza con un diseño atractivo y un motor bóxer de 2.4 litros que produce 228 caballos de fuerza.",
      color: [
        { name: "Negro Shichiroyi", color: "#202022", img: "//images.toyota-europe.com/es/product-token/a85bf2f0-0091-40f6-b7b6-56d1ceea977b/vehicle/297d83ae-2ca7-4fe4-af2c-cbb696001249/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_D4S_AM20.jpg"},
        { name: "Blanco Gorobe", color: "#FFFFFF", img: "URL White Paint Image" }
      ],
      rims: [{
        name: "Llantas de aleación de aluminio",
        img: "URL Imagen Llantas de aleación de aluminio",
      }],
      tires: [{
        name: "Neumáticos Michelin Pilot Sport 4",
        img: "URL Imagen Neumáticos Michelin Pilot Sport 4",
      }],
      Upholsterys: ["Tela negra con costuras rojas"],
      extras: [
        { name: "Sistema de escape deportivo", img: "URL Imagen Sistema de escape deportivo" },
        { name: "Alerón trasero", img: "URL Imagen Alerón trasero" },
        { name: "Difusor trasero", img: "URL Imagen Difusor trasero" },
      ],
    },
  ];
  
  getAllVehicules(): Vehicle[] {
    return this.vehicles;
  }
  
  getVehiculesById(id: number): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }
  constructor() { }
}
