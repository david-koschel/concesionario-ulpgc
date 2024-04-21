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
  private http = inject(HttpClient);

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
