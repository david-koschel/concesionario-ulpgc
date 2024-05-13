import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rent-vehicle-price',
  standalone: true,
  imports: [],
  templateUrl: './rent-vehicle-price.component.html',
  styleUrl: './rent-vehicle-price.component.scss'
})
export class RentVehiclePriceComponent {
  @Input() rentDays!: number;
  @Input() vehicle: any;
  @Input() fechaRecogidaString!: string;
  @Input() fechaLlegadaString!: string;

}
