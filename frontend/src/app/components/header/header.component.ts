import {Component, OnInit} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {trigger} from "@angular/animations";

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
  animations: [
  ]
})
export class HeaderComponent implements OnInit{
  sidebarVisible = false;

  constructor() {}

  ngOnInit(): void {
  }
}
