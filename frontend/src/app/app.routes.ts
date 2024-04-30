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
import {AboutUsComponent} from './components/about-us/about-us.component';
import {OurServicesComponent} from './components/our-services/our-services.component';
import {TermsAndConditionsComponent} from "./components/terms-and-conditions/terms-and-conditions.component";
import {PrivacyCookiesComponent} from "./components/privacy-cookies/privacy-cookies.component";
import {BlogListComponent} from "./components/blogs/blog-list/blog-list.component";

export const routes: Routes = [
  {
    path: "contacto",
    component: ContactComponent
  },
  {
    path: "terms-and-conditions",
    component: TermsAndConditionsComponent
  },
  {
    path: "privacy-cookies",
    component: PrivacyCookiesComponent
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
    path: "drive-request",
    component: DriveRequestFormComponent
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
    path: "blog-list",
    component: BlogListComponent,
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
    component: CatalogueVehiclesComponent,
    canActivate: [userIsAdminGuard]
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

