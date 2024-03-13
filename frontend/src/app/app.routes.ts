import { Routes } from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {
    path: "contacto",
    component: ContactComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];
