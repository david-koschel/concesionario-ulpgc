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
    FormsModule
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit, AfterContentInit{

  @ViewChild("previewer")
  previewer!: ElementRef;
  @ViewChild("editor")
  editor!: Editor;

  module: any;

  blogId!: string;
  blog: Blog;
  typeOptions = [{label: 'Evento', value: true}, {label: "Noticia", value: false}];

  disable = false;
  saveLoading = false;
  getterIsLoading = true;
  showInfo = false;

  filter: RegExp = /[abcdefghijklmnopqrstuvwxyz0123456789\-_]+/;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const toolbarOptions = [
      [{'header': [1, 2, 3, 4, 5, false]}],
      [{'font': []}],
      [{'align': []}],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'color': []}, {'background': []}],
      ['image', 'video', 'link']
    ];
    this.module = {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: this.imageHandler
        }
      }
    };
    this.blog = {title: "", description: "", image: "", published: false, data: "", endDate: null!};
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
    /*this.confirmationService.confirm({
      message: "Publicar esta entrada hará que sea visible para todo el mundo, ¿eso es lo que quiere?",
      accept: () => this.saveOrUpdate()
    });*/
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

    });
  }

  isDisabled(): boolean {
    if (this.blog.published) {
      return !this.blog.title ||
        !this.blog.endDate ||
        !this.blog.description ||
        !this.blog.image;
    }
    return !this.blog.title;
  }

  update() {
    const deltaData = JSON.stringify(this.editor.getQuill().editor.delta.ops);
    const blog: Blog = {...this.blog, data: deltaData};

    this.blogService.update(blog).subscribe({
    });
  }

  imageHandler(this: any) {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function (this: any) {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    tooltip.hide = function (this: any) {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = "Embed URL";
  }

  showPreview() {

  }
}
