import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Login } from '../../models/login';
import { AuthService } from 'src/app/Authenticate/auth.service';
import { NgForm } from '@angular/forms';
import { AuthenticateResponse } from '../../models/authenticate';
import { ApiResponse } from '../../models/apiresponse';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter();
  
  activedTab = 'login';
  invalidLogin = false;
  loginInfo: Login = { username: '', password: '' };
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  selectActiveTab(tab: string): void{
    this.activedTab = tab;
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  login(form:NgForm): void{
    if (form.valid) {
      this.authService.login(this.loginInfo).subscribe({
        next:(response:ApiResponse<AuthenticateResponse>) => {
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false;
          this.authService.checkAuthenticate();
          this.closeModal();
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      });
    }
  }
}
