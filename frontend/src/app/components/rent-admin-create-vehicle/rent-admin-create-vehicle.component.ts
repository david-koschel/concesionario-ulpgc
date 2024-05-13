import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RentVehicle } from '../../models/rent-vehicle';

@Component({
  selector: 'app-rent-admin-create-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rent-admin-create-vehicle.component.html',
  styleUrl: './rent-admin-create-vehicle.component.scss'
})
export class RentAdminCreateVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      img: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      engine: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      bookedSlots: [[]]
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: RentVehicle = this.vehicleForm.value;
      console.log('Nuevo vehículo creado:', newVehicle);
      this.vehicleForm.reset();
    }
  }
}