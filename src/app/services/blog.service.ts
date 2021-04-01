import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Blog } from '../models/Blog';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http: HttpClient;
  apiUrl: string = environment.apiUrl;
  blog: Blog;

  constructor(http: HttpClient) {
    this.http = http;
  }

  get(element: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + element);
  }

  getAllBlog(): Observable<any[]> {
    return this.get('api/GetAll').pipe(retry(1), catchError(this.errorHandler));
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.apiUrl + `api/GetById/${id}`);
  }

  deleteBlog(id: number): Observable<Blog> {
    return this.http.delete<Blog>(this.apiUrl + `api/Delete/${id}`);
  }

  createBlog(blog: Blog): Promise<Blog> {
    const endpoint = 'api/Create';
    return new Promise<Blog>((resolve: any): any => {
      this.http
        .post(this.apiUrl + endpoint, blog)
        .subscribe((createBlog: Blog): void => {
          resolve(createBlog);
        });
    });
  }

  updateBlog(blog: Blog): Promise<Blog> {
    const endpoint = 'api/Update';
    return new Promise<Blog>((resolve: any): any => {
      this.http
        .put(this.apiUrl + endpoint, blog)
        .subscribe((updateBlog: Blog): void => {
          resolve(updateBlog);
        });
    });
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
