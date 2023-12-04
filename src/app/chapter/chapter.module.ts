import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterComponent } from './chapter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChapterComponent
  ],
  declarations: [ChapterComponent]
})
export class ChapterModule { }
