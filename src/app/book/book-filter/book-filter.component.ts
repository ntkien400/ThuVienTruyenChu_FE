import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookDetail } from 'src/app/shared/models/book';
import { Category } from 'src/app/shared/models/category';
import { BookCategory } from 'src/app/shared/models/bookcategory';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {

  listBooks: BookDetail[] = [];
  bookCategories: BookCategory[] = [];
  categories: Category[]=[];
  
  selectedOrder?: string;
  selectedStatus?: string;
  selectedChapter?: number;
  selectedCate?: number;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadFilteredBooks();
  }

  showStatusOfBook(status: boolean): string{
    return status ? "Hoàn thành" : "Chưa hoàn thành";
  }

  transferBookTitle(title: string): string{
    return title.replace(/\s+/g, '-');
  }
  selectOrder(order: string){
    if(order != 'all'){
      this.selectedOrder = order;
    }
    else{
      this.selectedOrder = undefined;
    }
  }

  selectStatus(status: string){
    if(status != 'all'){
      this.selectedStatus = status;
    }
    else{
      this.selectedStatus = undefined;
    }
  }

  selectNumberOfChapter(chapter: number){
    if(chapter != 0){
      this.selectedChapter = chapter;
    }
  }

  selectCategory(cate: number){
    if(cate != 0){
      this.selectedCate = cate;
    }
  }

  getBookCategoriesByTitle(bookTitle: string): void{
    this.bookService.getBookCategoriesByTitle(bookTitle)
      .subscribe(categories => {
        this.bookCategories = categories.data;
        console.log(this.bookCategories);
        this.fetchCategoryName(this.bookCategories);
      });
  }

  fetchCategoryName(bookCategory: BookCategory[]): void{
    bookCategory.forEach(bookCategory =>{
      this.bookService.getCategoryById(bookCategory.categoryId).subscribe(fullCategory =>{
        this.categories.push(fullCategory.data);
      })
    })
  }
  
  loadFilteredBooks(order?: string, status?: string, chapter?: number, cate?: number): void{
    this.bookService.getFilterBooks(order, status, chapter, cate).subscribe(response => {
      this.listBooks = response.data;
      console.log(this.listBooks);

      if(this.listBooks){
        forkJoin(this.listBooks.map(book => this.getBookCategoriesByTitle(book.bookTitle)));
      }
    });
  }
}
