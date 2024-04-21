import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import { CatalogueService } from '../../services/catalogue.service';
import { CatalogueItems } from '../../services/catalogue.model';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  vehicles: CatalogueItems[] = [];

  constructor(private catalogueService: CatalogueService){}

  ngOnInit(): void {
      this.catalogueService.getCatalogue()
      .subscribe(data => {
        this.vehicles = data;
      });


  }
}
