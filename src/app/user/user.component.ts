import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.service';
import { Category } from '../shared/models/category';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeTab = 'information';
  selectInfo = 'info';
  listCategories: Category[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadAllCategories()
  }

  setActiveTab(tab : string) : void{
    this.activeTab = tab;
  }

  selectActive(tab:string): void{
    this.selectInfo = tab;
  }

  loadAllCategories(): void{
    this.bookService.getAllCategories().subscribe(response => {
      this.listCategories = response.data;
      console.log(this.listCategories);
    })
  }
}
