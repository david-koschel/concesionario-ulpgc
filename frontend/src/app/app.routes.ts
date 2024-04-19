import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogueComponent} from './components/catalogue/catalogue.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {userIsAdminGuard, userIsLoggedInGuard} from "./security/guards";
import { VehicleconfigurationComponent } from './components/vehicleconfiguration/vehicleconfiguration.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {ContactMessagesComponent} from "./components/contact-messages/contact-messages.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {DriveRequestFormComponent} from "./components/drive-request/drive-request-form/drive-request-form.component";
import {DriveRequestListComponent} from "./components/drive-request/drive-request-list/drive-request-list.component";

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
    path: "catalogue/drive-request",
    component: DriveRequestFormComponent
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
    path: "admin-panel",
    component: AdminPanelComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "admin-panel/contact-messages",
    component: ContactMessagesComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "drive-requests",
    component: DriveRequestListComponent,
    canActivate: [userIsAdminGuard]
  },
  {
    path: "admin-panel/drive-requests",
    component: DriveRequestListComponent,
    canActivate: [userIsLoggedInGuard]
  },
  {
    path: "admin-panel/drive-requests",
    component: DriveRequestListComponent,
    canActivate: [userIsLoggedInGuard]
  },
  {
    path: "vehicleconfiguration",
    component: VehicleconfigurationComponent
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
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

