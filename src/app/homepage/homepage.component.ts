import { Component, OnInit } from '@angular/core';
import { BookCard } from '../shared/models/book';
import { BookService } from '../book/book.service';
import { Category } from '../shared/models/category';
import { AuthService } from '../Authenticate/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  listNewBookCard: BookCard[] =[];
  listRecentBookCard: BookCard[] =[];
  listCategories: Category[]= [];
 
  constructor(private bookService: BookService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadNewBookCard();
    this.loadRecentBookCard();
    this.loadCategories();
  }

  loadNewBookCard(): void {
    const order = 'new';
    this.bookService.getFilterBooks(order).subscribe(response => {
      this.listNewBookCard = response.data.slice(0, 6);
      console.log(this.listNewBookCard);
    });
  }

  loadRecentBookCard(): void {
    const order = 'recent';
    this.bookService.getFilterBooks(order).subscribe(response => {
      this.listRecentBookCard = response.data.slice(0, 8);
    });
  }
  
  loadCategories(): void{
    this.bookService.getAllCategories().subscribe(response => {
      this.listCategories = response.data.slice(0,8);
    })
  }

  onCategoryClick(categoryId: number) {
    this.bookService.updateSelectedCategory(categoryId);
    this.router.navigate(['/book-filter']);
  }
}
