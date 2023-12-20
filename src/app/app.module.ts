import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageModule } from './homepage/homepage.module';
import { SharedModule } from './shared/shared.module';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ChapterModule } from './chapter/chapter.module';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './Authenticate/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomepageModule,
    SharedModule,
    BookModule,
    UserModule,
    ChapterModule,
    RouterModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'), // Function to retrieve the token from local storage
        allowedDomains: ['localhost:7234'], // List of domains where the token should be sent
        disallowedRoutes: [], // List of routes where the token should not be sent
      },
    }),
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
