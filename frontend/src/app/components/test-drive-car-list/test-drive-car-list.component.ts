import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DriveRequestService} from "../../service/drive-request.service";
import {TestDriveCar} from "../../models/test-drive-car.model";

@Component({
  selector: 'app-test-drive-car-list',
  standalone: true,
  imports: [
    DatePipe,
    SharedModule,
    TableModule
  ],
  templateUrl: './test-drive-car-list.component.html',
  styleUrl: './test-drive-car-list.component.scss'
})
export class TestDriveCarListComponent implements OnInit{
  cars: TestDriveCar[] = [];

  public constructor(private driveRequestService: DriveRequestService) {
  }

  ngOnInit() {
    this.loadCars();
  }

  private loadCars() {
    this.driveRequestService.getTestDriveCars().subscribe(
      cars => this.cars = cars
    )
  }
}
