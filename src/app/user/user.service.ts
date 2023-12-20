import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewComment } from '../shared/models/usercomment';
import { ApiResponse } from '../shared/models/apiresponse';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'https://localhost:7234/api/';

  constructor(private http: HttpClient) {
  }

  getUserCommentsByBook(bookId: number): Observable<ApiResponse<ViewComment[]>>{
    return this.http.get<ApiResponse<ViewComment[]>>(this.baseUrl + `UserComments/get-all-comment-by-book/${bookId}`);
  }

  getUserById(userId: string): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(this.baseUrl + `Users/get-user-by-id?userId=${userId}`);
  }
}