import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CatalogueService} from '../../services/catalogue.service';
import {RouterLink} from "@angular/router";
import {ConfigurableVehicle} from "../../models/configurable-vehicle/configurable-vehicle.model";

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  vehicles: ConfigurableVehicle[] = [];

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit(): void {
    this.catalogueService.getCatalogue()
      .subscribe(data => {
        this.vehicles = data;
      });
  }
}
