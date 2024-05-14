import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../models/blog.model";
import {BlogService} from "../../../services/blog.service";
import {RouterLink} from "@angular/router";
import {SanitizerPipe} from "../blog-entry/sanitizer.pipe";
import {HtmlToStringPipe} from "../blog-entry/html-to-string.pipe";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [
    RouterLink,
    SanitizerPipe,
    HtmlToStringPipe,
    ButtonModule,
    DialogModule,
    ChipsModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  providers: [MessageService]
})
export class BlogsComponent implements OnInit {

  blogs!: Blog[];
  visible = true;
  email: string | undefined;
  emailRegex: RegExp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

  public constructor(
    private blogService: BlogService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.blogService.getPublicAllBeforeToday().subscribe(
      blogs => this.blogs = blogs.sort((a, b) => b.id! - a.id!)
    );
  }

  subscribeToNewsletter() {
    if (!this.email || !this.emailRegex.test(this.email)) {
      this.messageService.add({
        summary: 'Correo inválido',
        detail: 'Introduzca un correo válido',
        severity: 'error',
        life: 7000
      });
    } else {
      this.blogService.subscribeToNewsletter(this.email).subscribe({
        next: () => {
          this.messageService.add({
            summary: 'Suscripción realizada',
            detail: 'Cuando publiquemos una nueva entrada, será informado',
            severity: 'success',
            life: 7000
          });
          this.visible = false;
        },
        error: (err: any) => this.messageService.add({
          summary: 'Error al registrar su correo',
          detail: err.error.message,
          severity: 'error',
          life: 7000
        })
      });
    }
  }
}
