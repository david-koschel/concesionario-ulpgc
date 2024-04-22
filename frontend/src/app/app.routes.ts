import {Routes} from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {userIsAdminGuard, userIsLoggedInGuard, userIsNotLoggedInGuard} from "./security/guards";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {ContactMessagesComponent} from "./components/contact-messages/contact-messages.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {LoginRegisterArregladoComponent} from "./components/login-register/login-register.component";
import {VehicleConfigurationComponent} from "./components/vehicle-configuration/vehicle-configuration.component";
import {CatalogueVehiclesComponent} from "./components/catalogue-vehicles/catalogue-vehicles.component";
import {DriveRequestFormComponent} from "./components/drive-request/drive-request-form/drive-request-form.component";
import {DriveRequestListComponent} from "./components/drive-request/drive-request-list/drive-request-list.component";
import {TestDriveCarListComponent} from "./components/test-drive-car-list/test-drive-car-list.component";

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
    path: "login-register",
    component: LoginRegisterArregladoComponent,
    canActivate: [userIsNotLoggedInGuard]
   },
   {
    path: "catalogue/drive-request",
    component: DriveRequestFormComponent
  },
  {
    path: "login",
    component: LoginComponent
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
    canActivate: [userIsAdminGuard]
  },
  {
    path: "drive-requests",
    component: DriveRequestListComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "test-drive-cars",
    component: TestDriveCarListComponent,
    canActivate: [userIsAdminGuard]
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

