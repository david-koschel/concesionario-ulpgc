import {Component, inject, OnInit} from '@angular/core';
import {CatalogueComponent} from '../catalogue/catalogue.component';
import {ConfigurableVehicle} from '../../models/configurable-vehicle/configurable-vehicle.model';
import {VehicleConfigurationList} from '../../models/vehicle-configuration-list';
import {VehicleService} from '../../services/vehicle.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vehicleconfiguration',
  standalone: true,
  imports: [CatalogueComponent, CommonModule],
  templateUrl: './vehicleconfiguration.component.html',
  styleUrl: './vehicleconfiguration.component.scss'
})
export class VehicleconfigurationComponent implements OnInit {
  //totalPrice: number;
  //principalImg: string;
  vehicleList: ConfigurableVehicle[] = [];
  vehicleConfigurationList!: VehicleConfigurationList;
  summaryList: any[] = [];
  extrasList: any[] = [];
  vehiculeService: VehicleService = inject(VehicleService);
  selectButton: string = "engine";
  characteristicLoad = "";
  imgCar: string = "";

  ngOnInit(): void {
    this.selectedButton('engineOption');
  }

  selectedButton(button: string) {
    const buttons = document.querySelectorAll('.selectorButton');
    buttons.forEach(btn => btn.classList.remove('selected'));

    this.selectButton = button;
    document.querySelector(`.selectorButton[class*="${button}"]`)?.classList.add('selected');
  }

  imgCarChange(imgPath: string) {
    this.imgCar = imgPath;
  }

  selectByClick(name: string, price: number, optionClass: string, multipleChoice: boolean) {
    if (!multipleChoice) {
      const classOption = document.querySelectorAll(`.${optionClass}`);
      if ((document.querySelectorAll('.check').length != 0)) {
        const beforeCheck = document.querySelectorAll('.check')[0].id;
        const option = this.vehicleConfigurationList[optionClass] as { name: string; price: number; };
        this.vehicleConfigurationList.totalPrice -= option.price;
      }
      classOption.forEach(cO => cO.classList.remove('check'));

      const check = document.getElementById(name);
      check?.classList.add('check');
      this.vehicleConfigurationList[optionClass] = {name, price};
      this.vehicleConfigurationList.totalPrice += price;
    } else {
      const idOption = document.getElementById(name);
      if (idOption?.classList.contains('check')) {
        idOption?.classList.remove('check');
        for (let i = 0; i < this.vehicleConfigurationList.extras.length; i++) {
          if (this.vehicleConfigurationList.extras[i].name == name) {
            this.vehicleConfigurationList.extras.splice(i, 1);
            this.vehicleConfigurationList.totalPrice -= price;
          }
        }
      } else {
        idOption?.classList.add('check');
        this.vehicleConfigurationList.extras.push({name: name, price: price});
        this.vehicleConfigurationList.totalPrice += price;
      }
    }
    this.summaryList = Object.entries(this.vehicleConfigurationList)
      .filter(([key, value]) => (key !== 'extras' && key !== 'totalPrice'))
      .map(([key, value]) => value);
    this.extrasList = this.vehicleConfigurationList.extras;
  }

  checkIfSelect(name: string, price: number, optionClass: string, multipleChoice: boolean) {
    const idOption = document.getElementById(name);
    if (!multipleChoice) {
      const option = this.vehicleConfigurationList[optionClass] as { name: string; price: number; };
      if (option.name == name) {
        idOption?.classList.add('check');
      }
    } else {
      for (let i = 0; i < this.extrasList.length; i++) {
        if (this.vehicleConfigurationList.extras[i].name == name) {
          idOption?.classList.add('check');
        }
      }
    }
  }

  imgColorChange(img: string) {
    //this.principalImg = img;
  }

  optionChecker() {
    for (let key in this.vehicleConfigurationList) {
      const option = this.vehicleConfigurationList[key] as { name: string; price: number; };
      if (option.name == '') {
        console.log("ELIJE TODO");
      }
    }
  }

}

