import {Component, OnDestroy, OnInit} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {RouterLink, Router} from "@angular/router";
import {LoginService} from "../../security/login.service";
import {Subscription} from "rxjs";
import {MenuModule} from "primeng/menu";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RouterLink,
    MenuModule,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected sidebarVisible = false;
  protected loggedIn!: boolean;
  private loggedInSubscription: Subscription;

  buttons: any[] | undefined;
  menuItems: MenuItem[] = []

  constructor(
    protected loginService: LoginService,
    private router: Router
  ) {
    this.loggedInSubscription = this.loginService.userIsLoggedIn$
      .subscribe(result => this.onUserLoggedInChange(result));
  }

  ngOnInit(): void {
    this.buildSidebarButtons();
    this.buildUserMenu();
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  onUserLoggedInChange(loggedInStatus: boolean) {
    this.loggedIn = loggedInStatus;
    if (this.loggedIn) {
      this.buildUserMenu();
    } else {
      this.menuItems = [];
    }
  }

  fakeLogin() {
    this.loginService.login("user-test", "test123");
  }

  logout() {
    this.loginService.logout();
  }

  buildSidebarButtons(){
   this.buttons = [
      {
        id: 1,
        name: ' Home',
        route: '/home',
        icon: 'pi pi-home'
      },
      {
        id: 2,
        name: 'Nuestro Catálogo',
        route: '/catalogue',
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
  }

  buildUserMenu(){
    this.menuItems = [];
    this.buildAdministrationItems();
    this.menuItems.push(
      {separator:true},
      {
        label: "Mi Perfil",
        icon: "pi pi-user",
        routerLink: "user"
      },
      {
        label: "Cerrar Sesión",
        icon: "pi pi-sign-out",
        command: () => this.logout()
      }
    );
  }

  private buildAdministrationItems(){
    this.menuItems.push(
      {
        label: "Panel de Administración",
        command: () => this.router.navigate(["/admin-panel"])
      }
    )
  }

  private buildCustomerItems() {

  }
}
