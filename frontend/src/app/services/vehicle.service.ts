import {inject, Injectable} from '@angular/core';
import {ConfigurableVehicle} from '../models/configurable-vehicle/configurable-vehicle.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigurableVehicleEngine} from "../models/configurable-vehicle/configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "../models/configurable-vehicle/configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "../models/configurable-vehicle/configurable-vehicle-extra.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  /*
     vehicles: ConfigurableVehicle[] = [
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
  */

  private http = inject(HttpClient)

  getAllVehicules(): Observable<ConfigurableVehicle[]> {
    return this.http.get<ConfigurableVehicle[]>("http://localhost:8080/api/user/current");
  }

  getVehiculesById(id: number): Observable<ConfigurableVehicle> {
    return this.http.get<ConfigurableVehicle>("http://localhost:8080/api/user/current");
  }

  getEngines(): Observable<ConfigurableVehicleEngine[]> {
    return this.http.get<ConfigurableVehicleEngine[]>("http://localhost:8080/api/vehicle/engine");
  }

  getRims(): Observable<ConfigurableVehicleRim[]> {
    return this.http.get<ConfigurableVehicleRim[]>("http://localhost:8080/api/vehicle/rim");
  }

  getExtras(): Observable<ConfigurableVehicleExtra[]> {
    return this.http.get<ConfigurableVehicleExtra[]>("http://localhost:8080/api/vehicle/extra");
  }

  addEngine(engine: ConfigurableVehicleEngine) {
    return this.http.post("http://localhost:8080/api/vehicle/engine", engine);
  }

  addRim(rim: ConfigurableVehicleRim) {
    return this.http.post("http://localhost:8080/api/vehicle/rim", rim);
  }

  addExtra(extra: ConfigurableVehicleExtra) {
    return this.http.post("http://localhost:8080/api/vehicle/extra", extra);
  }
}
