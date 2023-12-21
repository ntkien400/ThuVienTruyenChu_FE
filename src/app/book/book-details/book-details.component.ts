import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookCard, BookDetail } from 'src/app/shared/models/book';
import { Category } from 'src/app/shared/models/category';
import { BookCategory } from 'src/app/shared/models/bookcategory';
import { Chapter } from 'src/app/shared/models/chapter';
import { ViewComment } from 'src/app/shared/models/usercomment';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookDetails: BookDetail | null = null;
  bookCard: BookCard[] = [];
  bookCategories: BookCategory[] = [];
  categories: Category[] = [];
  chapters: Chapter[] = [];
  activeTab = 'summary';
  showContent = false;
  userComment: ViewComment[] = [];
  
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getBookDetailInfo();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleContent(){
    this.showContent = ! this.showContent;
  }

  getBookDetailInfo(): void {
    const bookTitle = this.route.snapshot.paramMap.get('bookTitle');

    if (bookTitle) {
      this.bookService.getBookByTitle(bookTitle)
      .subscribe(response => {
        this.bookDetails = response.data;
        if (this.bookDetails) {
          this.bookService.getBookCategoriesByTitle(this.bookDetails.bookTitle).subscribe(response => {
            this.bookCategories = response.data;
            this.fetchCategoryName();
          })
          console.log(this.bookDetails.id);
          this.loadBookSameAuthor(this.bookDetails.authorId);
          this.loadChaptersOfBook(this.bookDetails.id);
          this.loadCommentsOfBook(this.bookDetails.id);
        }
        else{
          this.router.navigate(['/not-found']);
        }
        console.log(this.bookDetails);
      })
    }

    else{
      this.router.navigate(['/not-found']);
    }
  }

  loadBookSameAuthor(authorId: number): void{
    this.bookService.getBooksByAuthor(authorId).subscribe(response => {
      this.bookCard = response.data;
    })
  }
  fetchCategoryName(): void {
    this.bookCategories.forEach(bookCategory => {
      this.bookService.getCategoryById(bookCategory.categoryId).subscribe(fullCategory => {
        this.categories.push(fullCategory.data);
        console.log(this.categories);
      })
    })
  }

  loadChaptersOfBook(bookId: number): void{
    if(this.bookDetails){
      this.bookService.getAllChaptersByBook(bookId).subscribe(response => {
        this.chapters = response.data;
        console.log(this.chapters);
      })
    }
  }

  navigateToChapter(chapterNumber: number): void{
    if(this.bookDetails){
      const bookTitleNormalize = this.bookDetails.bookTitleNormalize.replace(/\s+/g, '-');
      this.router.navigate(['/book-details/'+ bookTitleNormalize + '/chuong/' + chapterNumber]);
    }
    
  }

  loadCommentsOfBook(bookId: number): void{
    this.userService.getUserCommentsByBook(bookId).subscribe(response => {
      this.userComment = response.data;
      console.log(this.userComment);
    })
  }
}
