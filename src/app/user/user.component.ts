import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.service';
import { Category } from '../shared/models/category';
import { AuthService } from '../Authenticate/auth.service';
import { User } from '../shared/models/user';
import { UserLevel } from '../shared/models/userlevel';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeTab = 'information';
  selectInfo = 'info';
  listCategories: Category[] = [];
  isAuthenticate = false;
  userInfo: User|null = null;
  level: UserLevel|null =null;

  constructor(private authService: AuthService, private bookService: BookService, private userService: UserService) { }

  ngOnInit() {
    this.loadAllCategories();
    this.loadUserInfo();
  }

  setActiveTab(tab : string) : void{
    this.activeTab = tab;
  }

  selectActive(tab:string): void{
    this.selectInfo = tab;
  }

  loadUserInfo(): void{
    this.authService.isAuthenticated$.subscribe(result => {
      this.isAuthenticate = result;
      if(this.isAuthenticate){
        this.authService.user$.subscribe(response => {
          this.userInfo = response;

          if(this.userInfo){
            this.fetchLevelName(this.userInfo.userLevelId);
          }
        })
      }
    });
  }
  loadAllCategories(): void{
    this.bookService.getAllCategories().subscribe(response => {
      this.listCategories = response.data;
      console.log(this.listCategories);
    })
  }

  fetchLevelName(levelId: number): void{
    this.userService.getUserLevelById(levelId).subscribe(response => {
      this.level = response.data;
    })
  }
}
