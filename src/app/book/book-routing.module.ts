// book-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { ChapterComponent } from '../chapter/chapter.component';

const routes: Routes = [
  {path: 'book-details/:bookTitle', component: BookDetailsComponent},
  {path: 'book-filter', component: BookFilterComponent},
  {path: 'book-details/:bookTitle/chuong/:chapterNumber', component: ChapterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
