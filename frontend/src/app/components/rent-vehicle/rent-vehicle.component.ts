import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-vehicle',
  standalone: true,
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.scss']
})
export class RentVehicleComponent {
  @Input() vehicle: any;
  constructor(private router: Router) {}


}
