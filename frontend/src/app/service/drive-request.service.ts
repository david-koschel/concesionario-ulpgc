import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DriveRequest} from "../models/drive-request.model";
import {TestDriveCar} from "../models/test-drive-car.model";

@Injectable({
  providedIn: 'root'
})
export class DriveRequestService {

  constructor(private http: HttpClient) { }

  public getDriveRequests(): Observable<DriveRequest[]>{
    return this.http.get<DriveRequest[]>("http://localhost:8080/api/test-drive-request/all");
  }

  public addDriveRequest(driveRequest: DriveRequest): void {
    this.http.put("http://localhost:8080/api/test-drive-request/form", driveRequest);
  }

  public getTestDriveCars(): Observable<TestDriveCar[]>{
    return this.http.get<TestDriveCar[]>("http://localhost:8080/api/test-drive-car/all");
  }

  public saveTestDriveCar(testCar: TestDriveCar) {
    return this.http.post("http://localhost:8080/api/test-drive-car/add", testCar);
  }
}
