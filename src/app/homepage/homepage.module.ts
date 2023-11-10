import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { BookModule } from '../book/book.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BookModule,
    SharedModule
  ],
  exports: [
    HomepageComponent
  ],
  declarations: [HomepageComponent]
})
export class HomepageModule { }
