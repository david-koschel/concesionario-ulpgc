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
  startDate = new FormControl();
  endDate = new FormControl();
  invalidDate = false;
  currentDate = new Date();
  @Output()
  findFreeVehicles = new EventEmitter<{ startDate: Date, endDate: Date }>();

  onClickFindAvailableVehicles() {
    if (this.endDate.value < this.startDate.value) {
      this.invalidDate = true;

      setTimeout(() => {
        this.invalidDate = false;
      }, 3000);

      return;
    }

    this.invalidDate = false;
    this.findFreeVehicles.emit({
      startDate: this.startDate.value,
      endDate: this.endDate.value
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
