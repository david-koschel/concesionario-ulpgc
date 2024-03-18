import { Component, inject} from '@angular/core';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { Vehicle } from '../../vehicle';
import { VehicleService } from '../../vehicle.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vehicleconfiguration',
  standalone: true,
  imports: [CatalogueComponent, CommonModule],
  templateUrl: './vehicleconfiguration.component.html',
  styleUrl: './vehicleconfiguration.component.scss'
})
export class VehicleconfigurationComponent {
  vehicleList: Vehicle[] = [];
  vehiculeService: VehicleService = inject(VehicleService);
  constructor(){
    this.vehicleList = this.vehiculeService.getAllVehicules();
  }
}

