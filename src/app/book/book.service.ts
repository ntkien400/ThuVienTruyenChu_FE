import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookCard, BookDetail } from '../shared/models/book';
import { BookCategory } from '../shared/models/bookcategory';
import { Category } from '../shared/models/category';
import { Chapter, ViewChapter } from '../shared/models/chapter';
import { ApiResponse } from '../shared/models/apiresponse';

@Injectable({
    providedIn: 'root'
})
export class BookService{
    
    private baseUrl = 'https://localhost:7234/api/';

    private selectedCategorySource = new BehaviorSubject<number>(0);
    selectedCategory$ = this.selectedCategorySource.asObservable();

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

    getFilterBooks(order?: string, status?: string, chapter?: string, cate?: number): Observable<ApiResponse<BookDetail[]>>{
        let params = new HttpParams();

        if(order){
            params = params.set('order', order);
        }

        if(status){
            params = params.set('status', status);
        }

        if(chapter != undefined && chapter != null){
            params = params.set('chapter', chapter.toString());
        }

        if(cate != undefined && cate != null){
            params = params.set('cate', cate.toString());
        }

        return this.http.get<ApiResponse<BookDetail[]>>(this.baseUrl + `Books/filter-books`, {params});
    }

    getAllChaptersByBook(bookId: number): Observable<ApiResponse<Chapter[]>>{
        return this.http.get<ApiResponse<Chapter[]>>(this.baseUrl + `Chapters/get-all-chapters-of-book/${bookId}`);
    }

    getChapterByBook(bookId: number, chapNumber: number): Observable<ApiResponse<ViewChapter>>{
        return this.http.get<ApiResponse<ViewChapter>>(this.baseUrl + `Chapters/get-chapter-by-book?bookId=${bookId}&chapNumber=${chapNumber}`);
    }

    updateSelectedCategory(categoryId: number) {
        this.selectedCategorySource.next(categoryId);
      }
}