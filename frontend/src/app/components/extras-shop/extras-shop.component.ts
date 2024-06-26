import {Component, OnInit, ViewChild} from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ConfigurableVehicleExtra } from '../../models/configurable-vehicle/configurable-vehicle-extra.model';
import { CommonModule } from '@angular/common';
import { ExtraService } from '../../services/extra.service';
import { IndependentExtra } from '../../models/independentextra.model';
import {TpvFormComponent} from "../tpv-form/tpv-form.component";

@Component({
  selector: 'app-extras-shop',
  standalone: true,
  imports: [CommonModule, TpvFormComponent],
  templateUrl: './extras-shop.component.html',
  styleUrl: './extras-shop.component.scss'
})
export class ExtrasShopComponent implements OnInit{

  constructor(private vehicleService : VehicleService,private extraService: ExtraService){}

  extras: IndependentExtra[] = []

  @ViewChild("tpvForm")
  tpvForm!: TpvFormComponent;


  ngOnInit(): void {
      this.loadExtras()
  }

  loadExtras():void{
    this.extraService.getAll().subscribe(data=> this.extras = data)
  }

  buyExtras(extra:IndependentExtra){
    const id = extra.id as number
    this.extraService.buy(id).subscribe((res)=>{
      this.tpvForm.submitData(res);
    })
  }

}
