import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/Blog';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  blogForm: FormGroup;
  actionType: string;
  id: number;
  errorMessage: any;
  getBlog: Blog;

  // éléments du formulaire
  formTitle: string;
  formBody: string;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = 'id';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.blogForm = this.formBuilder.group({
      id: 0,
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.blogService
        .getBlogById(this.id)
        .subscribe(
          (data) => (
            (this.getBlog = data),
            this.blogForm.controls[this.formTitle].setValue(data.title),
            this.blogForm.controls[this.formBody].setValue(data.body))
      );
    }
  }

  saveUpdateBlog(): void {
    if (!this.blogForm.valid) {
      return;
    }

    const blog: Blog = {
      id: this.getBlog.id,
      dt: this.getBlog.dt,
      creator: this.getBlog.creator,
      title: this.blogForm.get(this.formTitle).value,
      body: this.blogForm.get(this.formBody).value,
    };
    this.blogService.updateBlog(blog).then((data) => {
      console.log(blog);
      this.router.navigate(['/blogs']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  get title(): any {
    return this.blogForm.get(this.formTitle);
  }
  get body(): any {
    return this.blogForm.get(this.formBody);
  }
}
