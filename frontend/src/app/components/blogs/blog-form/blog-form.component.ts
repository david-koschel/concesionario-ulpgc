import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {ActivatedRoute, Router} from "@angular/router";
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
    RippleModule
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class BlogFormComponent implements OnInit, AfterContentInit{

  @ViewChild("editor")
  editor!: Editor;
  @ViewChild('inputFile')
  inputFile!: ElementRef;

  module: any;

  blogId!: string;
  blog: Blog;

  disable = false;
  saveLoading = false;
  getterIsLoading = false;
  showInfo = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const toolbarOptions = [
      [{'header': [1, 2, 3, 4, 5, false]}],
      [{'font': []}],
      [{'align': []}],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'color': []}, {'background': []}]
    ];
    this.module = {
      toolbar: {
        container: toolbarOptions
      }
    };
    this.blog = {title: "", published: false, data: "", endDate: null!};
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.initBlogForm();
  }

  initBlogForm() {
    this.blogId = this.route.snapshot.params['blogId'];
    if (this.blogId !== "new") {
      this.editBlog();
    } else {
      this.getterIsLoading = false;
    }
  }

  editBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: blog => {
        this.editor.quill.setContents(JSON.parse(blog.data));
        this.blog = blog;
        this.blog.endDate = blog.endDate ? new Date(blog.endDate) : null!;
        this.disable = false;
        this.getterIsLoading = false;
      },
      error: () => {
        this.disable = true;
        this.getterIsLoading = false;
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
    const deltaData = JSON.stringify(this.editor.getQuill().editor.delta.ops);
    const blog: Blog = {...this.blog, data: deltaData};

    this.blogService.save(blog).subscribe({
      next: (blog : any) => {
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
    if (this.blog.published) {
      return !this.blog.title ||
        !this.blog.endDate
    }
    return !this.blog.title;
  }

  update() {
    const deltaData = JSON.stringify(this.editor.getQuill().editor.delta.ops);
    const blog: Blog = {...this.blog, data: deltaData};

    this.blogService.update(blog).subscribe({
      next: (blog:any) => {
        this.messageService.add({
          summary: "Publicación actualizada",
          detail: `La entrada "${blog.title}" se ha actualizado con éxito`,
          severity: "success"
        });
        this.blog = blog;
        this.blog.endDate = blog.endDate ? new Date(blog.endDate) : null!;
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
