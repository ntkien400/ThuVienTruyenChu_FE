import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Chapter, ViewChapter } from '../shared/models/chapter';
import { BookDetail } from '../shared/models/book';
import { DatePipe } from '@angular/common';
import { UserService } from '../user/user.service';
import { ViewComment } from '../shared/models/usercomment';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  showPanel: string | null = null;
  showContent = false;

  themeColors: string[] = ['#faf5ebcc', '#f5eacccc', '#e6f2e6cc', '#ffffffcc', '#e0e0e0cc', '#191b1ccc'];
  selectedTheme: string = '#faf5ebcc' ;

  fonts: string[] = ['Arial', 'Times', 'Courier', 'Georgia'];
  selectedFont: string = 'Arial';

  fontSize: number = 26; 
  lineSpacing: number = 100; 

  chapters: Chapter[] = [];
  chapter: ViewChapter | null = null;
  chapNumber: number | undefined;

  book: BookDetail | null = null;
  bookTitle: string | null =null;
  
  userComment: ViewComment[] = [];

  constructor(private bookService: BookService,
              private userService: UserService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router) {}

  ngOnInit() {
    this.loadChaptersOfBook();
    this.loadChapter();
  }

  togglePanel(panel: string): void {
    this.showPanel = this.showPanel === panel ? null : panel;
  }

  toggleContent(){
    this.showContent = ! this.showContent;
  }
  selectTheme(theme: string): void {
    this.selectedTheme = theme;
  }

  selectFont(font: string): void {
    this.selectedFont = font;
  }

  adjustFontSize(amount: number): void {
    this.fontSize += amount;
  }

  adjustLineSpacing(amount: number): void {
    this.lineSpacing += amount;
  }

  changeChapter(type: string): void{
        const chapterNumberString = this.route.snapshot.paramMap.get('chapterNumber');
        this.bookTitle = this.route.snapshot.paramMap.get('bookTitle');
        this.chapNumber = Number(chapterNumberString);

        if(type === 'prev' && this.chapNumber &&this.chapNumber >1){
          this.chapNumber = this.chapNumber -1;
          console.log('prev');
        }

        if(type === 'next' && this.chapNumber){
          this.chapNumber = this.chapNumber +1;
          console.log('next');
        }
        this.router.navigate(['/book-details/'+ this.bookTitle + '/chuong/' + this.chapNumber]);
     
  }

  navigateToChapter(chapter: number): void {
    this.bookTitle = this.route.snapshot.paramMap.get('bookTitle');
    this.router.navigate(['/book-details/'+ this.bookTitle + '/chuong/' + chapter]);
  }

  loadChaptersOfBook(): void{
    this.route.params.subscribe(params => {
      this.bookTitle = params['bookTitle'];

      if(this.bookTitle){
        this.bookService.getBookByTitle(this.bookTitle).subscribe(response => {
          this.book = response.data;
          
          this.bookService.getAllChaptersByBook(this.book.id).subscribe(response => {
            this.chapters = response.data;
          })
        })
      }
    });
  }

  loadChapter(): void{
    this.route.params.subscribe(params => {
      this.bookTitle = params['bookTitle'];
      this.chapNumber = params['chapterNumber'];

      if(this.bookTitle && this.chapNumber !== undefined ){
        this.bookService.getBookByTitle(this.bookTitle).subscribe(response => {
          this.book = response.data;
          
          if(this.book){
            this.bookService.getChapterByBook(this.book.id, this.chapNumber!).subscribe(response => {
              this.chapter = response.data;
              this.chapter.uploadedTimes = this.datePipe.transform(response.data.uploadedTimes, 'dd-MM-yyyy HH:mm')!;
            });
            this.loadCommentsOfBook(this.book.id);
          }
        });
      }
    });
  }

  loadCommentsOfBook(bookId: number): void{
    this.userService.getUserCommentsByBook(bookId).subscribe(response => {
      this.userComment = response.data;
      console.log(this.userComment);
    })
  }
}
