import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TestDriveCar} from "../models/test-drive-car.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestDriveCarService {

  constructor(private http: HttpClient) { }

  public getTestDriveCars(): Observable<TestDriveCar[]>{
    return this.http.get<TestDriveCar[]>("http://localhost:8080/api/test-drive-car/all");
  }

  public saveTestDriveCar(testCar: TestDriveCar) {
    return this.http.post("http://localhost:8080/api/test-drive-car/add", testCar);
  }
}
