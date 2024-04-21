import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DriveRequestService} from "../../service/drive-request.service";
import {TestDriveCar} from "../../models/test-drive-car.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-test-drive-car-list',
  standalone: true,
  imports: [
    DatePipe,
    SharedModule,
    TableModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './test-drive-car-list.component.html',
  styleUrl: './test-drive-car-list.component.scss'
})
export class TestDriveCarListComponent implements OnInit{

  cars: TestDriveCar[] = [];
  testCarForm !: FormGroup;

  submitted: boolean = false;
  loading: boolean = false;

  public constructor(
    private driveRequestService: DriveRequestService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initializeTestCarForm();
  }

  private loadCars() {
    this.driveRequestService.getTestDriveCars().subscribe(
      cars => this.cars = cars
    )
  }

  private initializeTestCarForm() {
    this.loadCars();
    this.testCarForm = this.formBuilder.group({
      model: ["", Validators.required],
      carLicense: ["", Validators.required]
    })
  }

  private trimControl(controlName: string) {
    this.testCarForm.controls[controlName].setValue(
      this.testCarForm.controls[controlName].value.trim()
    );
  }

  submit(){
    this.submitted = true;

    this.trimControl("model");
    this.trimControl("carLicense");

    if (!this.testCarForm.invalid){
      const testCar : TestDriveCar = {...this.testCarForm.value};
      this.addCar(testCar);
    }
  }

  addCar(testCar: TestDriveCar) {
    this.loading = true;
    this.driveRequestService.saveTestDriveCar(testCar).subscribe({
        next: () => {
          this.loading = false;
          this.initializeTestCarForm();
          this.submitted = false;
        }
      }
    )
  }
}
