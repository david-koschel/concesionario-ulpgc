import { Component, EventEmitter, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rent-date',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './rent-date.component.html',
  styleUrl: './rent-date.component.scss'
})
export class RentDateComponent {
  fechaRecogida = new FormControl();
  fechaLlegada = new FormControl();
  fechaInvalida = false;
  @Output() buscarVehiculosDisponibles = new EventEmitter<{ fechaRecogida: Date, fechaLlegada: Date }>();

  onBuscarVehiculosDisponibles() {
    if (this.fechaLlegada.value < this.fechaRecogida.value) {
      this.fechaInvalida = true;

      setTimeout(() => {
        this.fechaInvalida = false;
      }, 3000);
  
      return;
    }
  
    this.fechaInvalida = false;
    this.buscarVehiculosDisponibles.emit({
      fechaRecogida: this.fechaRecogida.value,
      fechaLlegada: this.fechaLlegada.value
    });
  }
  
  
}
