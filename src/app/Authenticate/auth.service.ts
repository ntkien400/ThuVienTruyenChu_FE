import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../shared/models/login';
import { User } from '../shared/models/user';
import { UserService } from '../user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7234/api/Authenticate/login';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  
  constructor(private http: HttpClient, 
    private userService: UserService,
     private jwtHelper: JwtHelperService,
     private cookieService: CookieService) {}

  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl, login);
  }

  checkAuthenticate(): void{
    let isAuthenticated = false;
    const accessToken = this.cookieService.get('accessToken');
    if(accessToken && !this.jwtHelper.isTokenExpired(accessToken)){
      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      const nameidentifier = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
      const userId = decodedToken?.[nameidentifier];

      isAuthenticated = true;
      this.fetchUser(userId);
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  private fetchUser(userId: string): void{
    this.userService.getUserById(userId).subscribe(response => {
      this.userSubject.next(response.data);
    })
  }
}
