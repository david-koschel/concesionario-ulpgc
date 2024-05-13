import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CalendarModule} from "primeng/calendar";


@Component({
  selector: 'app-rent-date',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule
  ],
  templateUrl: './rent-date.component.html',
  styleUrl: './rent-date.component.scss'
})
export class RentDateComponent {
  fechaRecogida = new FormControl();
  fechaLlegada = new FormControl();
  fechaInvalida = false;
  currentDate = new Date();
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

  getDateClass(date: any) {
    const calendarDate = new Date(date.year, date.month, date.day).toDateString();
    /*if (this.occupiedDates.has(calendarDate)) {
      return "occupied";
    }*/
    return null;
  }

}
