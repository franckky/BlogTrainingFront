import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogAddComponent } from './pages/blog-add/blog-add.component';
import { BlogEditComponent } from './pages/blog-edit/blog-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogsComponent,
    BlogAddComponent,
    BlogEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
