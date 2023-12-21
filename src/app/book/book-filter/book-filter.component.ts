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
  selectedChapter?: string;
  selectedCate?: number;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.selectedCategory$.subscribe(category => {
      this.selectedCate = category;
    });
    this.loadFilteredBooks();
    this.loadAllCategories();
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

  selectNumberOfChapter(chapter: string){
    if(chapter != 'all'){
      this.selectedChapter = chapter;
    }
    else{
      this.selectedChapter = undefined;
    }
  }

  selectCategory(cate?: number){
    if(cate != undefined){
      this.selectedCate = cate;
    }
    else{
      this.selectedCate = undefined;
    }
  }

  loadAllCategories(): void{
    this.bookService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    })
  }
  
  loadFilteredBooks(): void{
    this.bookService.getFilterBooks(this.selectedOrder, this.selectedStatus, this.selectedChapter, this.selectedCate).subscribe(response => {
      this.listBooks = response.data;
      console.log(this.listBooks);
    });
  }
}
