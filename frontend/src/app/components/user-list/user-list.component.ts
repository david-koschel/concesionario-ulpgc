import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    TableModule,
    RouterLink,
    InputTextModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private userService = inject(UserService);
  protected users!: User[]

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  protected readonly console = console;
}
