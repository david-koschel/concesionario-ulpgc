import {Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {VehicleService} from "../../services/vehicle.service";
import {ConfigurableVehicleEngine} from "../../models/configurable-vehicle/configurable-vehicle-engine.model";
import {ConfigurableVehicleRim} from "../../models/configurable-vehicle/configurable-vehicle-rim.model";
import {ConfigurableVehicleExtra} from "../../models/configurable-vehicle/configurable-vehicle-extra.model";
import {CatalogueService} from "../../services/catalogue.service";
import {ConfigurableVehicle} from "../../models/configurable-vehicle/configurable-vehicle.model";
import {ConfigurableVehicleColor} from "../../models/configurable-vehicle/configurable-vehicle-color.model";

@Component({
  selector: 'app-configurable-vehicle-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DropdownModule,
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './configurable-vehicle-form.component.html',
  styleUrl: './configurable-vehicle-form.component.scss'
})
export class ConfigurableVehicleFormComponent implements OnInit {


  private formBuilder = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  private catalogue = inject(CatalogueService);

  protected form!: FormGroup;
  protected error = false;

  @Output() onVehicleSaved = new EventEmitter<boolean>();

  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('colorInputFile') colorInputFile!: ElementRef;

  selectedEngines!: ConfigurableVehicleEngine[];
  engines!: ConfigurableVehicleEngine[];

  selectedRims!: ConfigurableVehicleRim[];
  rims!: ConfigurableVehicleRim[];

  selectedExtras!: ConfigurableVehicleExtra[];
  extras!: ConfigurableVehicleExtra[];

  colors: ConfigurableVehicleColor[] = [];

  @Input() editVehicle!: ConfigurableVehicle;

  ngOnInit() {
    this.loadVehicleItems();
    this.startForm();
  }

  loadVehicleItems() {
    this.vehicleService.getEngines().subscribe(data => this.engines = data);
    this.vehicleService.getRims().subscribe(data => this.rims = data);
    this.vehicleService.getExtras().subscribe(data => this.extras = data);
  }

  startForm() {
    if (this.editVehicle) {
      this.startExistingForm();
    } else {
      this.startNewForm();
    }
  }

  startNewForm() {
    this.selectedEngines = [];
    this.selectedRims = [];
    this.selectedExtras = [];
    this.colors = [];
    this.form = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      description: ['', Validators.required],
      basePrice: [null, [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]]
    });
  }

  startExistingForm() {
    this.selectedEngines = this.editVehicle.engines;
    this.selectedRims = this.editVehicle.rims;
    this.selectedExtras = this.editVehicle.extras;
    this.colors = this.editVehicle.colors;
    this.form = this.formBuilder.group({
      brand: [this.editVehicle.brand, Validators.required],
      model: [this.editVehicle.model, Validators.required],
      description: [this.editVehicle.description, Validators.required],
      basePrice: [this.editVehicle.basePrice, [Validators.required, Validators.min(0)]],
      image: [this.editVehicle.image, [Validators.required]]
    });
  }

  submitForm() {
    this.error = !this.formIsValid();
    if (this.formIsValid()) {
      const vehicleToAdd: ConfigurableVehicle = {
        ...this.form.value,
        colors: this.colors,
        rims: this.selectedRims,
        engines: this.selectedEngines,
        extras: this.selectedExtras
      };
      this.addOrUpdateVehicle(vehicleToAdd).subscribe({
        next: () => {
          this.onVehicleSaved.emit(true);
          this.loadVehicleItems();
          this.startForm();
          this.inputFile.nativeElement.value = "";
        },
        error: () => this.onVehicleSaved.emit(false)
      });
    }
  }

  addOrUpdateVehicle(vehicleToAdd: ConfigurableVehicle) {
    if (this.editVehicle) {
      vehicleToAdd.id = this.editVehicle.id;
      return this.catalogue.updateVehicle(vehicleToAdd);
    } else {
      return this.catalogue.addNewVehicle(vehicleToAdd);
    }
  }

  private formIsValid(): boolean {
    return this.form.valid &&
      this.selectedEngines.length > 0 &&
      this.selectedRims.length > 0 &&
      this.selectedExtras.length > 0 &&
      this.colorListIsValid();
  }

  private colorListIsValid(): boolean {
    return this.colors.length > 0 &&
      this.colors.filter(color => !(color.color && color.name && (color.price || color.price === 0) && color.vehicleImage)).length == 0;
  }

  handleVehicleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.form.get('image')?.setValue(reader.result?.slice(23));
    reader.readAsDataURL(file);
  }

  handleColorUpload(event: any, color: ConfigurableVehicleColor): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => color.vehicleImage = reader.result!.toString();
    reader.readAsDataURL(file);
  }

  addColor(): void {
    this.colors.push({color: '#ffffff'});
  }

  deleteColor(index: number): void {
    this.colors.splice(index, 1);
  }
}
