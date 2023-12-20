import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Authenticate/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoginModalOpen = false;
  isAuthenticate = false;
  userInfo: User|null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(result => {
      this.isAuthenticate = result;
      if(this.isAuthenticate){
        this.authService.user$.subscribe(response => {
          this.userInfo = response;
        })
      }
    });
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }
}
