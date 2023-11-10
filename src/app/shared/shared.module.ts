import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    CarouselComponent,
    NavBarComponent,
    FooterComponent
  ],
  exports: [
    CarouselComponent,
    NavBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
