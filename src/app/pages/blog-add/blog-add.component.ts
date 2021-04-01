import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Blog } from 'src/app/models/Blog';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
})
export class BlogAddComponent implements OnInit {
  public blog: Blog = new Blog();
  private blogService: BlogService;
  private formBuilder: FormBuilder;
  router: Router;
  actionType: string;

  public blogForm = new FormGroup({
    creator: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    body: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  constructor(
    formBuilder: FormBuilder,
    blogService: BlogService,
    router: Router) {
    this.blogService = blogService;
    this.formBuilder = formBuilder;
    this.router = router;
  }

  saveCreateBlog(form: any): void {
    if (!this.blogForm.valid) {
      return;
    }

    this.blogService.createBlog(form).then((blog: Blog): any => {
      console.log(blog);
      this.router.navigate(['/blogs']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.actionType = 'Add';
  }

  get creator(): any {
    return this.blogForm.get('creator');
  }
  get title(): any {
    return this.blogForm.get('title');
  }
  get body(): any {
    return this.blogForm.get('body');
  }
}
