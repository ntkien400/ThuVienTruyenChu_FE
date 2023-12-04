import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookCategory } from 'src/app/shared/models/bookcategory';
import { BookService } from '../book.service';
import { BookCard } from 'src/app/shared/models/book';
import { Category } from 'src/app/shared/models/category';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  
  @Input() removeBorder: boolean = false;
  @Input() bookCard!: BookCard;

  bookCategories: BookCategory[] = [];
  categories: Category[]=[];
  
  constructor(
    private bookService:BookService,
    private dataService: DataService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getBookCategoriesByTitle();
  }

  getBookCategoriesByTitle(): void{
    this.bookService.getBookCategoriesByTitle(this.bookCard.bookTitle)
      .subscribe(categories => {
        this.bookCategories = categories.data;
        //console.log(this.bookCategories);
        this.fetchCategoryName();
      });
  }

  fetchCategoryName(): void{
    this.bookCategories.forEach(bookCategory =>{
      this.bookService.getCategoryById(bookCategory.categoryId).subscribe(fullCategory =>{
        this.categories.push(fullCategory.data);
        //console.log(this.categories);
      })
    })
  }

  // transformBookTitle(bookTitle: string): string {
  //   const withoutAccents = bookTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  //   const withHyphens = withoutAccents.replace(/\s+/g, '-');
  //   return withHyphens.toLowerCase();
  // }

  navigateToBookDetail(): void{
    this.route.navigate(['/book-details/'+ this.bookCard.bookTitleNormalize.replace(/\s+/g, '-')])
  }
}
