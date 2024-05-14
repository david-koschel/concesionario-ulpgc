import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {Blog} from "../../../models/blog.model";
import {Editor, EditorModule} from "primeng/editor";
import {NgIf} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    NgIf,
    CalendarModule,
    InputTextModule,
    SelectButtonModule,
    CheckboxModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DialogModule,
    EditorModule,
    FormsModule,
    RippleModule,
    RouterLink
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class BlogFormComponent implements AfterContentInit {

  module: any;

  blogId!: string;
  blog: Blog;

  @ViewChild("editor")
  editor!: Editor;

  saveLoading = false;
  data!: string;

  showLink = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const toolbarOptions = [
      [{'header': [1, 2, 3, 4, 5, false]}],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'color': []}, {'background': []}]
    ];
    this.module = {
      toolbar: {
        container: toolbarOptions
      }
    };
    this.blog = {title: "", published: false, data: ""};
  }

  ngAfterContentInit(): void {
    this.initBlogForm();
  }

  initBlogForm() {
    this.blogId = this.route.snapshot.params['blogId'];
    if (this.blogId !== "new") {
      this.editBlog();
    }
  }

  editBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: blog => {
        this.data = blog.data;
        this.blog = blog;
        this.showLink = blog.published;
        setTimeout(() => {
          this.editor.quill.clipboard.dangerouslyPasteHTML(this.data, "silent");
          this.editor.quill.history.clear();
        }, 100);
      }
    });
  }

  saveOrUpdate() {
    this.saveLoading = true;
    if (this.blogId === "new") {
      this.save();
    } else {
      this.update();
    }
  }

  saveOrUpdateToPublish() {
    this.confirmationService.confirm({
      message: "Publicar esta entrada hará que sea visible para todo el mundo, ¿eso es lo que quiere?",
      accept: () => this.saveOrUpdate()
    });
  }

  onSubmit() {
    if (this.blog.published) {
      this.saveOrUpdateToPublish();
    } else {
      this.saveOrUpdate();
    }
  }

  save() {
    const blog: Blog = {...this.blog, data: this.data};

    this.blogService.save(blog).subscribe({
      next: (blog: any) => {
        this.messageService.add({
          summary: "Publicación guardada",
          detail: `La entrada "${blog.title}" se ha guardado con éxito`,
          severity: "success"
        });
        this.router.navigate([`blog-form/${blog.id}`]).then(
          () => window.location.reload()
        );
      },
      error: (error: { error: { message: any; }; }) => {
        this.messageService.add({
          summary: "Error al guardar",
          detail: error.error.message,
          severity: "error"
        });
        this.saveLoading = false;
      }
    });
  }

  isDisabled(): boolean {
    return !this.blog.title;

  }

  update() {
    const blog: Blog = {...this.blog, data: this.data};
    this.blogService.update(blog).subscribe({
      next: (blog: any) => {
        this.messageService.add({
          summary: "Publicación actualizada",
          detail: `La entrada "${blog.title}" se ha actualizado con éxito`,
          severity: "success"
        });
        this.blog = blog;
        this.showLink = blog.published;
        this.saveLoading = false;
      },
      error: (error: { error: { message: any; }; }) => {
        this.messageService.add({
          summary: "Error al actualizar",
          detail: error.error.message,
          severity: "error"
        });
        this.saveLoading = false;
      }
    });
  }
}
