import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
  }

}
