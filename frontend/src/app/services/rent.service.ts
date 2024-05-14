import {inject, Injectable} from '@angular/core';
import {RentVehicle} from '../models/rent-vehicle';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RentRequest} from "../models/rent-request.model";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private http = inject(HttpClient);

  getFreeVehicles(startDate: string, endDate: string): Observable<RentVehicle[]> {
    return this.http.put<RentVehicle[]>("http://localhost:8080/api/rent-vehicle-request/public/free-cars", {startDate, endDate});
  }

  getUserVehicles(): Observable<RentRequest[]> {
    return this.http.get<RentRequest[]>("http://localhost:8080/api/rent-vehicle-request/user",);
  }

  rentVehicle(rentRequest: RentRequest): Observable<RentVehicle[]> {
    return this.http.put<RentVehicle[]>("http://localhost:8080/api/rent-vehicle-request/public/form", rentRequest);
  }

  calculateDays(startDate: Date, endDate: Date): number {
    const differenceInMs = endDate.getTime() - startDate.getTime();

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMs / millisecondsInADay) + 1;
  }

  getRentVehicles(): Observable<RentVehicle[]>{
    return this.http.get<RentVehicle[]>("http://localhost:8080/api/rent-vehicles/all");
  }

  addVehicle(rentVehicle: RentVehicle): Observable<RentVehicle>{
    return this.http.post<RentVehicle>("http://localhost:8080/api/rent-vehicles/add", rentVehicle);
  }

  continuePayment(id: number) {
    return this.http.get<RentRequest[]>(`http://localhost:8080/api/rent-vehicle-request/user/${id}`);
  }
}
