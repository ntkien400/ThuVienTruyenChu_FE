import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookRoutingModule } from './book-routing.module';
import { BookFilterComponent } from './book-filter/book-filter.component';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
  ],
  declarations: [
    BookCardComponent,
    BookDetailsComponent,
    BookFilterComponent
  ],
  exports: [
    BookCardComponent,
    BookDetailsComponent,
    BookFilterComponent
  ]
})
export class BookModule { }
