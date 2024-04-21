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
import {DriveRequestService} from "../../../service/drive-request.service";
import {DropdownModule} from "primeng/dropdown";
import {TestDriveCar} from "../../../models/test-drive-car.model";
import {DriveRequest} from "../../../models/drive-request.model";

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

  cars: String[] = [];

  driveRequestForm !: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private driveRequestService: DriveRequestService
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
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      carModel: ["", Validators.required],
      dates: ["", Validators.required],
      privacy: ["", Validators.requiredTrue]
    })
  }

  private getCars() {
    this.driveRequestService.getTestDriveCars().subscribe(
      cars => this.cars = cars.map(
          car => car.model
      )
    )
  }

  private trimControl(controlName: string) {
    this.driveRequestForm.controls[controlName].setValue(
      this.driveRequestForm.controls[controlName].value.trim()
    );
  }

  public submit() {
    this.submitted = true;

    this.trimControl("username");
    this.trimControl("email");


    if(!this.driveRequestForm.invalid){
      const driveRequest: DriveRequest = {...this.driveRequestForm.value};
        this.addDriveRequest(driveRequest);
    }
  }

  private addDriveRequest(driveRequest: DriveRequest){
    this.driveRequestService.addDriveRequest(driveRequest);
  }
}
