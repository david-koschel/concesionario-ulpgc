import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import {DriveRequestService} from "../../../services/drive-request.service";
import {DropdownModule} from "primeng/dropdown";
import {DriveRequest} from "../../../models/drive-request.model";
import {TestDriveCarService} from "../../../services/test-drive-car.service";
import {TestDriveCar} from "../../../models/test-drive-car.model";

@Component({
  selector: 'app-drive-request-form',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    FloatLabelModule,
    InputTextModule,
    NgIf,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './drive-request-form.component.html',
  styleUrl: './drive-request-form.component.scss',
  providers: [MessageService]
})
export class DriveRequestFormComponent implements OnInit{

  cars: TestDriveCar[] = [];
  occupiedDates: Set<String> = new Set<String>;
  currentDate: Date = new Date();
  private selectedStartDate: Date = new Date();
  private selectedEndDate: Date = new Date();

  driveRequestForm !: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private driveRequestService: DriveRequestService,
    private testDriveCarService: TestDriveCarService
  ) {}

  ngOnInit(): void {
    this.initializeDriveRequestForm();
  }

  get f() {
    return this.driveRequestForm.controls;
  }

  private initializeDriveRequestForm() {
    this.getCars();
    this.driveRequestForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      testDriveCar: ["", Validators.required],
      dates: ["", Validators.required],
      privacy: ["", Validators.requiredTrue]
    })
  }

  private getCars() {
    this.testDriveCarService.getTestDriveCars().subscribe(
      cars => this.cars = cars
    )
  }

  private trimControl(controlName: string) {
    this.driveRequestForm.controls[controlName].setValue(
      this.driveRequestForm.controls[controlName].value.trim()
    );
  }

  public submit() {
    this.submitted = true;

    this.trimControl("name");
    this.trimControl("email");

    if(!this.driveRequestForm.invalid && this.validateAndTrimDate()){
      const driveRequest: DriveRequest = {...this.driveRequestForm.value};
      driveRequest.startDate = this.selectedStartDate;
      driveRequest.endDate = this.selectedEndDate;
      driveRequest.accepted = false;
      this.addDriveRequest(driveRequest);
    }
  }

  private addDriveRequest(driveRequest: DriveRequest){
    this.driveRequestService.addDriveRequest(driveRequest).subscribe({
      next: value => {
        this.initializeDriveRequestForm();
        this.submitted = false;
      }
    });
  }

  getSelectedDates(): void {
    const testDriveCar: TestDriveCar = this.driveRequestForm.controls["testDriveCar"].value;
    this.occupiedDates = new Set();
    this.driveRequestService.getSelectedDatesByTestDriveCar(testDriveCar).subscribe(
      dates => dates.forEach(date => this.occupiedDates.add(
          new Date(date).toDateString()
        )
      )
    );
  }

  getDateClass(date: any) {
    const calendarDate = new Date(date.year, date.month, date.day).toDateString();
    if (this.occupiedDates.has(calendarDate)){
      return "occupied";
    }
    return null;
  }

  private validateAndTrimDate() :  boolean {
    this.selectedStartDate = this.driveRequestForm.controls["dates"].value[0];
    this.selectedEndDate = this.driveRequestForm.controls["dates"].value[1];
    if (this.selectedEndDate.getDate() - this.selectedStartDate.getDate() > 2){
      this.messageService.add({
        summary: 'Error',
        detail: 'Debe seleccionar un máximo de 2 días de prueba',
        severity: 'error'}
      );
      return false;
    } else {
      return true;
    }
  }
}
