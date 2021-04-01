import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogAddComponent } from './pages/blog-add/blog-add.component';
import { BlogEditComponent } from './pages/blog-edit/blog-edit.component';

const routes: Routes = [

    {path: '' , pathMatch: 'full', component: BlogsComponent},
    { path: 'blog/:id', component: BlogComponent },
    { path: 'add-blog', component: BlogAddComponent },
    { path: 'blog/edit/:id', component: BlogEditComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
