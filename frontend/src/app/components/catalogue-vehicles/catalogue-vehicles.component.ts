import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CatalogueService} from '../../services/catalogue.service';
import {CatalogueItems} from '../../services/catalogue.model';
import {SidebarModule} from 'primeng/sidebar';
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

  addEngineVisible: boolean = false;
  addRimVisible: boolean = false;
  addExtraVisible: boolean = false;

  editableEngine: ConfigurableVehicleEngine | undefined;
  editableRim: ConfigurableVehicleRim | undefined;
  editableExtra: ConfigurableVehicleExtra | undefined;

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

  addVehicleForm():void{
    this.addFormVisible = true;
    return;
  }

  addEngine(event: any) {
    this.vehicleService.addEngine(event).subscribe({
      next: () => {
        this.sendSuccessMessage('Motor guardado con éxito');
        this.addEngineVisible = false;
        this.editableEngine = undefined;
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
        this.editableRim = undefined;
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
        this.editableRim = undefined;
        this.loadExtras();
      },
      error: () => this.sendErrorMessage('accesorio')
    });
  }

  vehicleSaved(saved: boolean) {
    if (saved) {
      this.sendSuccessMessage('Vehículo guardado con éxito');
      this.addFormVisible = false;
      this.editFormVisible = false;
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

  editEngine(engine?: ConfigurableVehicleEngine) {
    this.editableEngine = engine;
    this.addEngineVisible = true;
  }

  editRim(rim?: ConfigurableVehicleRim) {
    this.editableRim = rim;
    this.addRimVisible = true;
  }

  editExtra(extra?: ConfigurableVehicleExtra) {
    this.editableExtra = extra;
    this.addExtraVisible = true;
  }
}
