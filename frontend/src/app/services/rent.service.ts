import {inject, Injectable} from '@angular/core';
import {RentVehicle} from '../models/rent-vehicle';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private http = inject(HttpClient);

  getFreeVehicles(startDate: Date, endDate: Date): Observable<RentVehicle[]> {
    return this.http.put<RentVehicle[]>("http://localhost:8080/api/rent-vehicle-request/public/free-cars", {startDate, endDate});
  }

  calculateDays(startDate: Date, endDate: Date): number {
    const differenceInMs = endDate.getTime() - startDate.getTime();

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMs / millisecondsInADay);
  }

  getRentVehicles(): Observable<RentVehicle[]>{
    return this.http.get<RentVehicle[]>("http://localhost:8080/api/rent-vehicles/all");
  }

  addVehicle(rentVehicle: RentVehicle): Observable<RentVehicle>{
    return this.http.post<RentVehicle>("http://localhost:8080/api/rent-vehicles/add", rentVehicle)
  }
}
