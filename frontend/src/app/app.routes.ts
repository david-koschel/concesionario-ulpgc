import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {userIsLoggedInGuard} from "./security/guards";
import { VehicleconfigurationComponent } from './components/vehicleconfiguration/vehicleconfiguration.component';

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
    path: "catalogue",
    component: CatalogueComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgotpassword",
    component: ForgotpasswordComponent
  },
  {
    path: "user",
    component: UserProfileComponent,
    canActivate: [userIsLoggedInGuard]
  },
  {
    path: "vehicleconfiguration",
    component: VehicleconfigurationComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

