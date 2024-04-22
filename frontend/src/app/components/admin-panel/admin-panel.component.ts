import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  adminButtons: {routerLink: string, label: string}[] = [
    {routerLink: "/contact-messages", label: "Bandeja de Entrada"},
    {routerLink: "/user-list", label: "Usuarios"},
    {routerLink: "/catalogue-vehicles", label: "Catálogo de Vehículos"}
  ]

}
