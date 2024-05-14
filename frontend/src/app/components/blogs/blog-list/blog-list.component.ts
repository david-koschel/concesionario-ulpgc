import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../models/blog.model";
import {Table, TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BlogService} from "../../../services/blog.service";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    TableModule,
    CheckboxModule,
    DatePipe,
    RouterLink,
    ButtonModule,
    NgIf,
    InputTextModule,
    ConfirmPopupModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class BlogListComponent implements OnInit{
  blogs!: Blog[];
  blogList!: Blog[];
  loading = true;

  public constructor(
    private blogService: BlogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getAll().subscribe({
        next: blogs => {
          this.blogList = blogs;
          this.loading = false;
        }
    });
  }

  confirmPublishing(event: Event, blog: Blog) {
    this.confirmationService.confirm({
      target: event.target!,
      message: blog.published ?
        "¿Quiere archivar esta entrada?" :
        "¿Quiere publicar esta entrada?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: 'Yes',
      accept: () => this.invertBlogPublishing(blog)
    });
  }

  invertBlogPublishing(blog: Blog) {
    const blogToUpdate = {...blog, published: !blog.published};
    this.blogService.update(blogToUpdate).subscribe({
      next: () => {
        this.messageService.add({
          summary: "Éxito",
          detail: `El blog se ha ${blog.published ? "archivado" : "publicado"} con éxito`,
          severity: "success",
        });
        this.getBlogs();
      },
      error: () => {
        this.messageService.add({
          summary: "Error",
          detail: `Error al ${blog.published ? "archivar" : "publicar"} el blog`,
          severity: "error",
        });
      }
    });
  }
}
