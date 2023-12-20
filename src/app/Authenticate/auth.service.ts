import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7234/api/Authenticate/login';

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl, login);
  }

}
