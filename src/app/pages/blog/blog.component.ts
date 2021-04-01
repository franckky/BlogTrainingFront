import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/models/Blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog: Observable<Blog>;
  Id: number;

  constructor(private blogService: BlogService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.Id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadBlog();
  }

  loadBlog() {
    this.blog = this.blogService.getBlogById(this.Id);
  }

}
