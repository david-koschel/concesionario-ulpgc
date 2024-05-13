import {inject, Injectable} from '@angular/core';
import {ConfigurableVehicle} from '../models/configurable-vehicle/configurable-vehicle.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigurableVehicleEngine} from "../models/configurable-vehicle/configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "../models/configurable-vehicle/configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "../models/configurable-vehicle/configurable-vehicle-extra.model";
import {UserConfiguration} from "../models/configurable-vehicle/configured-vehicle.model";
import {UserVehicle} from "../models/user-vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private http = inject(HttpClient);

  getVehiculeById(id: number): Observable<ConfigurableVehicle> {
    return this.http.get<ConfigurableVehicle>(`http://localhost:8080/api/vehicle/public/${id}`);
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

  saveVehicle(vehicle: UserConfiguration) {
    return this.http.post("http://localhost:8080/api/vehicle/configuration", vehicle);
  }

  getUserConfigurations(): Observable<UserConfiguration[]> {
    return this.http.get<UserConfiguration[]>("http://localhost:8080/api/vehicle/configuration");
  }

  buyConfiguration(id: number): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/vehicle/buy/${id}`);
  }

  getUserVehicles(): Observable<UserVehicle[]> {
    return this.http.get<UserVehicle[]>("http://localhost:8080/api/vehicle/bought");
  }

  continueVehiclePurchase(id: number) {
    return this.http.get(`http://localhost:8080/api/vehicle/continue-purchase/${id}`);
  }
}
