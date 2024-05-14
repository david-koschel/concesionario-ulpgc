import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../models/blog.model";
import {BlogService} from "../../../services/blog.service";
import {SanitizerPipe} from "./sanitizer.pipe";

@Component({
  selector: 'app-blog-entry',
  standalone: true,
  imports: [
    SanitizerPipe
  ],
  templateUrl: './blog-entry.component.html',
  styleUrl: './blog-entry.component.scss'
})
export class BlogEntryComponent implements OnInit{

  blogId!: string;
  blog !: Blog;

  public constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.params['blogId'];
    this.getBlog();
  }

  private getBlog() {
    this.blogService.getById(this.blogId).subscribe(
      blog => this.blog = blog
    );
  }
}
