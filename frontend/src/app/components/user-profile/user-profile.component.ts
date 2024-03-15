import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  protected userCardRows: { name: string; value: string }[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.userCardRows = [
        {name: "Nombre", value: "Pedro Rodríguez"},
        {name: "Correo electrónico", value: user.email},
        {name: "Dirección", value: "Calle Juan Rejón, 23, 35014, Las Palmas de Gran Canaria"},
        {name: "Nombre de usuario", value: user.username},
        {name: "Contraseña", value: '********'}
      ]
    });
  }
}
