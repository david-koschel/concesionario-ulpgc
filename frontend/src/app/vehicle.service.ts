import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle';

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
      engine: ["2400cc 150cv Diesel", "3000cc 200cv Diesel"],
      color: [
        { name: "Negro Shichiroyi", color: "#202022", img: "//images.toyota-europe.com/es/product-token/a85bf2f0-0091-40f6-b7b6-56d1ceea977b/vehicle/297d83ae-2ca7-4fe4-af2c-cbb696001249/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_D4S_AM20.jpg"},
        { name: "Blanco Gorobe", color: "#F5F2F2", img: "URL White Paint Image" }
      ],
      rims: [{
        name: "Llantas de aleación de aluminio",
        img: "URL Imagen Llantas de aleación de aluminio",
      }],
      Upholsterys: ["Tela negra con costuras rojas"],
      extras: [
        { name: "Sistema de escape deportivo", img: "URL Imagen Sistema de escape deportivo" },
        { name: "Alerón trasero", img: "URL Imagen Alerón trasero" },
        { name: "Difusor trasero", img: "URL Imagen Difusor trasero" },
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
      engine: ["2400cc 150cv Diesel", "3000cc 200cv Diesel"],
      color: [
        { name: "Blanco Classic", color: "#F2F3EF", img:  "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_040_FC20.jpg"},
        { name: "Gris Grafito", color: "#66696C", img: "//images.toyota-europe.com/es/product-token/4f31b7e4-c842-4b96-9361-800e4a365ec7/vehicle/49d473c5-42bb-4a1f-a349-7445b63b151c/width/847/height/334/scale-mode/1/padding/10/background-colour/FFFFFF/image-quality/75/day-exterior-3_1G3_FC20.jpg" }
      ],
      rims: [
        {name: "Llantas de aleación de aluminio", img: "assets/vehicleconfiguration/hilux/llantas1.PNG",},
        {name: "Llantas de acero", img: "assets/vehicleconfiguration/hilux/llantas2.PNG",}
      ],
      Upholsterys: ["Tela negra con costuras rojas", "Cuero negro"],
      extras: [
        { name: "Barras antivuelco", img: "assets/vehicleconfiguration/hilux/barras_antivuelco.webp" },
        { name: "Asientos calefactables", img: "assets/vehicleconfiguration/hilux/asientos_calefactables.webp" },
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
