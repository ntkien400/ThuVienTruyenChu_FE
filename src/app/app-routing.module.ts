import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ChapterComponent } from './chapter/chapter.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
