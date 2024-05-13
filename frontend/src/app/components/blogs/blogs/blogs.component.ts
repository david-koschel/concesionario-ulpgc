import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../models/blog.model";
import {BlogService} from "../../../services/blog.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [
    RouterLink
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
      blogs => this.blogs = blogs
    )
  }
}
