import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/Blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Observable<Blog[]>;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): any {
    this.blogs = this.blogService.getAllBlog();
  }

  delete(id): any {
    const message = confirm('Do you want to delete blog with id: ' + id);
    if (message) {
      this.blogService.deleteBlog(id).subscribe((data) => {
        this.loadBlogs();
      });
    }
  }

}
