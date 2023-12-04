import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {

  @Input() book: any

  listbooks: Array<any> = [
    {
      "Id": 1,
      "Name":"Tên truyện",
      "Author":"tác giả",
      "Content":"Tóm tắt nội dung, đây là tóm tắt nội dung của truyện, đây là tóm tắt nội dung của truyện",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện2",
      "Author":"tác giả",
      "Content":"Tóm tắt nội dung, đây là tóm tắt nội dung của truyện, đây là tóm tắt nội dung của truyện",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện3",
      "Author":"tác giả",
      "Content":"Tóm tắt nội dung, đây là tóm tắt nội dung của truyện, đây là tóm tắt nội dung của truyện",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện4",
      "Author":"tác giả",
      "Content":"Tóm tắt nội dung, đây là tóm tắt nội dung của truyện, đây là tóm tắt nội dung của truyện",
      "Category":"Thể loại"
    }
  ]
  
  constructor() { }

  ngOnInit() {
  }

}
