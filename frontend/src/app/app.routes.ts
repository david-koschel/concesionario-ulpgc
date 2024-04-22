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
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import {TermsandconditionsComponent} from "./components/termsandconditions/termsandconditions.component";
import {PrivacycookiesComponent} from "./components/privacycookies/privacycookies.component";

export const routes: Routes = [
  {
    path: "contacto",
    component: ContactComponent
  },
  {
    path: "termsandconditions",
    component: TermsandconditionsComponent
  },
  {
    path: "privacycookies",
    component: PrivacycookiesComponent
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
    path: "vehicle-configuration",
    component: VehicleconfigurationComponent
  },
  {
    path: "about-us",
    component: AboutUsComponent
  },
  {
    path: "our-services",
    component: OurServicesComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

