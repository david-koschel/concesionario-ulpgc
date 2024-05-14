import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RentVehicle } from '../../models/rent-vehicle';
import {ButtonModule} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RentService} from "../../services/rent.service";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-rent-admin-create-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, InputTextModule, SharedModule, TableModule, DividerModule],
  templateUrl: './rent-admin-create-vehicle.component.html',
  styleUrl: './rent-admin-create-vehicle.component.scss'
})
export class RentAdminCreateVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  cars!: RentVehicle[];

  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private rentService: RentService
  ) { }

  ngOnInit(): void {
    this.rentService.getRentVehicles().subscribe(
      vehicles => this.cars = vehicles
    )
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      img: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      engine: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: RentVehicle = this.vehicleForm.value;
      this.rentService.addVehicle(newVehicle).subscribe({
        next: value => {
          this.vehicleForm.reset();
        }
      })
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.vehicleForm.get('img')?.setValue(reader.result);
    reader.readAsDataURL(file);
  }
}
