import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueItems } from "./catalogue.model";
import {ConfigurableVehicle} from "../models/configurable-vehicle/configurable-vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private allUrl = 'http://localhost:8080/api/catalogue/all';
  private addUrl = 'http://localhost:8080/api/catalogue/add';
  private editUrl = 'http://localhost:8080/api/catalogue/edit';

  constructor(private http: HttpClient) { }

  getCatalogue(): Observable<CatalogueItems[]> {
    return this.http.get<CatalogueItems[]>(this.allUrl);
  }

  addNewVehicle(addedVehicle: ConfigurableVehicle): Observable<CatalogueItems>{
    return this.http.post<CatalogueItems>(this.addUrl,addedVehicle);
  }

  updateVehicle(updatedVehicle: CatalogueItems): Observable<CatalogueItems>{
    return this.http.post<CatalogueItems>(this.editUrl,updatedVehicle);
  }
}
