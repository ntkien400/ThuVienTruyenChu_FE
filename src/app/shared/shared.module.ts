import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    CarouselComponent,
    NavBarComponent,
    FooterComponent,
    LoginSigninComponent
  ],
  exports: [
    CarouselComponent,
    NavBarComponent,
    FooterComponent,
    LoginSigninComponent
  ]
})
export class SharedModule { }
