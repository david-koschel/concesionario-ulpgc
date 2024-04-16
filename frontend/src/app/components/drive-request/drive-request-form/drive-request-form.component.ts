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
    FormsModule
  ],
  templateUrl: './drive-request-form.component.html',
  styleUrl: './drive-request-form.component.scss',
  providers: [MessageService]
})
export class DriveRequestFormComponent implements OnInit{

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
    this.driveRequestForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      car: ["", Validators.required],
      dates: ["", Validators.required],
      privacy: ["", Validators.requiredTrue]
    })
  }

  public submit() {
    //this.driveRequestService.addDriveRequest();
  }
}
