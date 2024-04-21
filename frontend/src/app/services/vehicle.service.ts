import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
   vehicles: Vehicle[] = [
    {
      id: 1,
      make: "Toyota",
      model: {
        name: "GR86",
        img: "URL Imagen Toyota GR86",
      },
      price: 30000,
      descripcion: "Un deportivo biplaza con un diseño atractivo y un motor bóxer de 2.4 litros que produce 228 caballos de fuerza.",
      engine: [
        { name: "2400cc 150cv Diesel", price: 0},
        { name: "3000cc 200cv Diesel", price: 3000},
      ],
      color: [
        { name: "Blanco Classic", color: "#F2F3EF", img:  "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_040_FC20.jpg", price:0,},
        { name: "Gris Grafito", color: "#66696C", img: "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_1G3_FC20.jpg", price:3000,}
      ],
      rims: [
        {name: "Llantas de aleación de aluminio", img: "assets/vehicleconfiguration/hilux/llantas1.PNG", price:0},
        {name: "Llantas de acero", img: "assets/vehicleconfiguration/hilux/llantas2.PNG", price:3000}
      ],
      upholsterys:
      [
        { name: "Tela negra con costuras rojas", price: 0},
        { name: "Cuero negro", price: 3000},
      ],
      extras: [
        { name: "Barras antivuelco", img: "assets/vehicleconfiguration/hilux/barras_antivuelco.webp", price:3000},
        { name: "Asientos calefactables", img: "assets/vehicleconfiguration/hilux/asientos_calefactables.webp", price:3000 },
      ],
    },
    {
      id: 1,
      make: "Toyota",
      model: {
        name: "Hilux",
        img: "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_040_FC20.jpg",
      },
      price: 30000,
      descripcion: "La Toyota Hilux, sinónimo de durabilidad y fiabilidad, es la pickup mediana ideal para enfrentar cualquier desafío. Con un diseño robusto y una cabina repleta de tecnología avanzada, ofrece un rendimiento excepcional en cualquier terreno. Equipada con motores potentes y eficientes, la Hilux se destaca por su capacidad de carga y remolque superior, siendo la compañera perfecta tanto para el trabajo duro como para la aventura.",
      engine: [
        { name: "2400cc 150cv Diesel", price: 0},
        { name: "3000cc 200cv Diesel", price: 3000},
      ],
      color: [
        { name: "Blanco Classic", color: "#F2F3EF", img:  "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_040_FC20.jpg", price:0,},
        { name: "Gris Grafito", color: "#66696C", img: "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_1G3_FC20.jpg", price:3000,}
      ],
      rims: [
        {name: "Llantas de aleación de aluminio", img: "assets/vehicleconfiguration/hilux/llantas1.PNG", price:0},
        {name: "Llantas de acero", img: "assets/vehicleconfiguration/hilux/llantas2.PNG", price:3000}
      ],
      upholsterys:
      [
        { name: "Tela negra con costuras rojas", price: 0},
        { name: "Cuero negro", price: 3000},
      ],
      extras: [
        { name: "Barras antivuelco", img: "assets/vehicleconfiguration/hilux/barras_antivuelco.webp", price:3000},
        { name: "Asientos calefactables", img: "assets/vehicleconfiguration/hilux/asientos_calefactables.webp", price:3000 },
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
