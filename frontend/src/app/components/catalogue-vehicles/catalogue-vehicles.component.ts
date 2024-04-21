import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {CatalogueService} from '../../services/catalogue.service';
import { CatalogueItems } from '../../services/catalogue.model';
import { SidebarModule } from 'primeng/sidebar';
import {ConfigurationFormComponent} from "../configuration-form/configuration-form.component";
import {VehicleService} from "../../services/vehicle.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfigurableVehicleEngine} from "../../models/configurable-vehicle/configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "../../models/configurable-vehicle/configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "../../models/configurable-vehicle/configurable-vehicle-extra.model";
import {ConfigurableVehicleFormComponent} from "../configurable-vehicle-form/configurable-vehicle-form.component";


@Component({
  selector: 'app-catalogue-vehicles',
  standalone: true,
  imports: [CommonModule, SidebarModule, ConfigurationFormComponent, ToastModule, ConfigurableVehicleFormComponent],
  templateUrl: './catalogue-vehicles.component.html',
  styleUrl: './catalogue-vehicles.component.scss'
})
export class CatalogueVehiclesComponent implements OnInit{

  editFormVisible: boolean = false;
  addFormVisible: boolean = false;
  vehicles: CatalogueItems[] = [];
  currentVehicle: any;

  base64img: string | undefined;
  addEngineVisible: boolean = false;
  addRimVisible: boolean = false;
  addExtraVisible: boolean = false;

  engines: ConfigurableVehicleEngine[] = [];
  rims: ConfigurableVehicleRim[] = [];
  extras: ConfigurableVehicleExtra[] = [];

  constructor(private catalogueService: CatalogueService, private vehicleService: VehicleService,
              private messageService: MessageService){}

  ngOnInit(): void {
      this.loadVehicles();
      this.loadEngines();
      this.loadRims();
      this.loadExtras();
  }

  loadVehicles():void{
    this.catalogueService.getCatalogue()
      .subscribe(data => {
        this.vehicles = data;
      });
  }

  loadEngines():void{
    this.vehicleService.getEngines().subscribe(data => this.engines = data);
  }

  loadRims():void{
    this.vehicleService.getRims().subscribe(data => this.rims = data);
  }

  loadExtras():void{
    this.vehicleService.getExtras().subscribe(data => this.extras = data);
  }

  editVehicle(vehicle: CatalogueItems): void{
    this.editFormVisible = true;
    this.currentVehicle = vehicle;
  }


  saveChanges(vehicle:CatalogueItems):void{
    const name = document.getElementById('name') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;
    const base64Text = document.getElementById('base64Text') as HTMLInputElement;

    if (this.isNotValid(name,description,base64Text)) {
      alert('Todos los campos son obligatorios. Por favor, rellenalos.');
      return;
    }

    const index = this.vehicles.findIndex(vehicle => vehicle === this.currentVehicle);

    this.vehicles[index].brand = name.value;
    this.vehicles[index].description = description.value;
    this.vehicles[index].image = this.base64img as string;


    this.catalogueService.updateVehicle(this.vehicles[index]).subscribe(data =>{
      console.log(data);
      this.loadVehicles();
    });




    this.clearEditForm(name,description,base64Text);
    this.editFormVisible = false;
    return;

  }
  cancelEdit():void{
    this.editFormVisible = false;
    this.clearEditForm( document.getElementById('name') as HTMLInputElement,
    document.getElementById('description') as HTMLInputElement,
    document.getElementById('base64Text') as HTMLInputElement);
    return;
  }

  isNotValid(name: HTMLInputElement, description: HTMLInputElement,base64Text: HTMLInputElement):boolean{
    return (name.value.trim() === '' || description.value.trim() === '' || base64Text.value.trim() === '');
  }

  clearEditForm(name: HTMLInputElement, description: HTMLInputElement,base64Text: HTMLInputElement):void{
    name.value=''; description.value='';base64Text.value='';
    return;
  }


  addVehicleForm():void{
    this.addFormVisible = true;
    return;
  }

  onFileSelected(event:any):void{
    const image = event.target.files[0];
    if(image){
      const reader = new FileReader();
      reader.onloadend = () => {
        const str = reader.result as string;
        this.base64img = str.slice(23);
        console.log(this.base64img);
      }
      reader.readAsDataURL(image);
    }


  }

  addEngine(event: any) {
    this.vehicleService.addEngine(event).subscribe({
      next: () => {
        this.sendSuccessMessage('Motor guardado con éxito');
        this.addEngineVisible = false;
        this.loadEngines();
      },
      error: () => this.sendErrorMessage('motor')
    });
  }

  addRim(event: any) {
    this.vehicleService.addRim(event).subscribe({
      next: () => {
        this.sendSuccessMessage('Llanta guardada con éxito');
        this.addRimVisible = false;
        this.loadRims();
      },
      error: () => this.sendErrorMessage('llanta')
    });
  }

  addExtra(event: any) {
    this.vehicleService.addExtra(event).subscribe({
      next: () => {
        this.sendSuccessMessage('Accesorio guardado con éxito');
        this.addExtraVisible = false;
        this.loadExtras();
      },
      error: () => this.sendErrorMessage('accesorio')
    });
  }

  vehicleSaved(saved: boolean) {
    if (saved) {
      this.sendSuccessMessage('Vehículo guardado con éxito');
      this.addFormVisible = false;
      this.loadVehicles();
    } else {
      this.sendErrorMessage('vehículo');
    }
  }

  private sendSuccessMessage(text: string) {
    this.messageService.add({
      summary: 'Éxito',
      detail: text,
      severity: 'success'
    });
  }

  private sendErrorMessage(text: string) {
    this.messageService.add({
      summary: 'Error',
      detail: `Error al guardar ${text}`,
      severity: 'error'
    });
  }
}
