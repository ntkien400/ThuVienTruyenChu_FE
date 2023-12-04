import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, BookCard, BookDetail } from '../shared/models/book';
import { BookCategory } from '../shared/models/bookcategory';
import { Category } from '../shared/models/category';
import { Chapter } from '../shared/models/chapter';

@Injectable({
    providedIn: 'root'
})
export class BookService{
    
    private baseUrl = 'https://localhost:7234/api/';

    constructor(private http:HttpClient){
    }

    getBookByTitle(bookTitle?: string): Observable<ApiResponse<BookDetail>>{
        return this.http.get<ApiResponse<BookDetail>>(this.baseUrl + `Books/get-book-by-title/${bookTitle}`);
    }

    getBookCategoriesByTitle(bookTitle: string): Observable<ApiResponse<BookCategory[]>>{
        return this.http.get<ApiResponse<BookCategory[]>>(this.baseUrl + `BookCategories?bookTitle=${bookTitle}`);
    }

    getBooksByAuthor(authorId: number): Observable<ApiResponse<BookCard[]>>{
        return this.http.get<ApiResponse<BookCard[]>>(this.baseUrl + `Books/get-book-by-author/${authorId}`);
    }
    getCategoryById(id: number): Observable<ApiResponse<Category>>{
        return this.http.get<ApiResponse<Category>>(this.baseUrl + `Categories?id=${id}`);
    }

    getAllCategories(): Observable<ApiResponse<Category[]>>{
        return this.http.get<ApiResponse<Category[]>>(this.baseUrl + `Categories/get-all-category`);
    }

    getOrderBooks(order: string): Observable<ApiResponse<BookCard[]>>{
        return this.http.get<ApiResponse<BookCard[]>>(this.baseUrl + `Books/filter-books?order=${order}`);
    }

    getChaptersByBook(bookId: number): Observable<ApiResponse<Chapter[]>>{
        return this.http.get<ApiResponse<Chapter[]>>(this.baseUrl + `Chapters/get-all-chapters-of-book/${bookId}`);
    }
}