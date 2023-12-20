import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewComment } from '../shared/models/usercomment';
import { ApiResponse } from '../shared/models/apiresponse';

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
}