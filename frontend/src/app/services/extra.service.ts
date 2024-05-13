import {inject, Injectable} from '@angular/core';
import {ConfigurableVehicle} from '../models/configurable-vehicle/configurable-vehicle.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IndependentExtra } from '../models/independentextra.model';


@Injectable({
    providedIn: 'root'
  })


  export class ExtraService{
    private http = inject(HttpClient);

    getAll(): Observable<IndependentExtra[]>{
        return this.http.get<IndependentExtra[]>("http://localhost:8080/api/independent-extras/all")
    }

    buy(id:number):Observable<any>{
      return this.http.post<any>(`http://localhost:8080/api/independent-extras/buy/${id}`,null);
    }

    getUserExtras():Observable<IndependentExtra[]>{
      return this.http.get<IndependentExtra[]>("http://localhost:8080/api/independent-extras/get-user-extras")
    }

    addIndependentExtra(extra:IndependentExtra){
      return this.http.post<IndependentExtra>("http://localhost:8080/api/independent-extras/add-independent-extra",extra)
    }

    updateIndependentExtra(extra:IndependentExtra){
      return this.http.post<IndependentExtra>("http://localhost:8080/api/independent-extras/update-independent-extra",extra)
    }
  }

