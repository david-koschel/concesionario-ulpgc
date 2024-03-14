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
