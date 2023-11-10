import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  listbooks: Array<any> = [
    {
    "Name":"Tên truyện",
    "Author":"tác giả",
    "Content":"Tóm tắt nội dung, đây là tóm tắt nội dung của truyện, đây là tóm tắt nội dung của truyện ",
    "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện2",
      "Author":"tác giả",
      "Content":"TÓm tắt nội dung2",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện3",
      "Author":"tác giả",
      "Content":"TÓm tắt nội dung3",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện4",
      "Author":"tác giả",
      "Content":"TÓm tắt nội dung4",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện5",
      "Author":"tác giả",
      "Content":"TÓm tắt nội dung5",
      "Category":"Thể loại"
    },
    {
      "Name":"Tên truyện6",
      "Author":"tác giả",
      "Content":"TÓm tắt nội dung6",
      "Category":"Thể loại"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
