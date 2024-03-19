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
  selectButton: string = "engine";
  characteristicLoad = "";
  imgCar: string = "";

  constructor(){
    this.vehicleList = this.vehiculeService.getAllVehicules();
  }
  selectedButton(button: string) {
    const buttons = document.querySelectorAll('.selectorButton');
    buttons.forEach(btn => btn.classList.remove('selected'));

    this.selectButton = button;
    document.querySelector(`.selectorButton[class*="${button}"]`)?.classList.add('selected');
  }
  imgCarChange(imgPath: string){
    this.imgCar = imgPath;
  }
  
}

