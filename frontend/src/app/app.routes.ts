import {Routes} from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {userIsAdminGuard, userIsLoggedInGuard} from "./security/guards";
import {VehicleConfigurationComponent} from './components/vehicle-configuration/vehicle-configuration.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {ContactMessagesComponent} from "./components/contact-messages/contact-messages.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {CatalogueVehiclesComponent} from "./components/catalogue-vehicles/catalogue-vehicles.component";
import {LoginRegisterComponent} from "./components/login-register/login-register.component";
import {LoginRegisterArregladoComponent} from "./components/login-register-arreglado/login-register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";

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
    component: LoginRegisterComponent
  },
  {
    path: "login-register",
    component: LoginRegisterArregladoComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "user",
    component: UserProfileComponent,
    canActivate: [userIsLoggedInGuard]
  },
  {
    path: "admin-panel",
    component: AdminPanelComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "contact-messages",
    component: ContactMessagesComponent,
    canActivate: [userIsLoggedInGuard]
  },
  {
    path: "vehicle-configurator/:id",
    component: VehicleConfigurationComponent
  },
  {
    path: "user-list",
    component: UserListComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "user-form/:userId",
    component: UserFormComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "catalogue-vehicles",
    component: CatalogueVehiclesComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

