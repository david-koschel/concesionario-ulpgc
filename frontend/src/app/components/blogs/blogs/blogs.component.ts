import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../models/blog.model";
import {BlogService} from "../../../services/blog.service";
import {RouterLink} from "@angular/router";
import {SanitizerPipe} from "../blog-entry/sanitizer.pipe";
import {HtmlToStringPipe} from "../blog-entry/html-to-string.pipe";

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [
    RouterLink,
    SanitizerPipe,
    HtmlToStringPipe
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{

  blogs!: Blog[];

  public constructor(
    private blogService: BlogService
  ) {
  }

  ngOnInit(): void {
    this.blogService.getPublicAllBeforeToday().subscribe(
      blogs => this.blogs = blogs.sort((a, b) => b.id! - a.id!)
    );
  }
}
