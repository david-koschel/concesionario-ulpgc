import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "primeng/sidebar";
import {ToastModule} from "primeng/toast";
import {DriveRequestService} from "../../../service/drive-request.service";
import {DriveRequest} from "../drive-request.model";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-drive-request-list',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    SidebarModule,
    ToastModule,
    TableModule,
    RouterLink,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './drive-request-list.component.html',
  styleUrl: './drive-request-list.component.scss'
})
export class DriveRequestListComponent implements OnInit{

  driveRequests: DriveRequest[] = [];

  public constructor(private driveRequestService: DriveRequestService) {
  }

  ngOnInit(): void {
    this.loadDriveRequests();
  }

  private loadDriveRequests() {
    this.driveRequestService.getDriveRequests().subscribe(
      driveRequests => this.driveRequests = driveRequests
    );
  }
}
