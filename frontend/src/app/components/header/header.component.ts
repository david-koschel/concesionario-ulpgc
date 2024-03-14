import {Component, OnDestroy} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {LoginService} from "../../security/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: []
})
export class HeaderComponent implements OnDestroy {

  protected sidebarVisible = false;
  protected loggedIn!: boolean;
  private loggedInSubscription: Subscription;

  buttons = [
    {
      id: 1,
      name: ' Home',
      route: '/home',
      icon: 'pi pi-home'
    },
    {
      id: 2,
      name: 'Nuestro Catálogo',
      route: '',
      icon: ''
    },
    {
      id: 3,
      name: 'Nuestros Servicios',
      route: '',
      icon: ''
    },
    {
      id: 4,
      name: 'Sobre Nosotros',
      route: '',
      icon: ''
    },
    {
      id: 5,
      name: 'Contacto',
      route: '/contacto',
      icon: ''
    },
    {
      id: 6,
      name: 'Iniciar Sesión',
      route: '',
      icon: ''
    },
  ]

  constructor(protected loginService: LoginService) {
    this.loggedInSubscription = this.loginService.userIsLoggedIn$.subscribe(result => this.loggedIn = result);
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  fakeLogin() {
    this.loginService.login("user-test", "test123");
  }

  logout() {
    this.loginService.logout();
  }
}
