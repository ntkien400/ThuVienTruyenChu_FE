import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeTab = 'information';
  setActiveTab(tab : string) : void{
    this.activeTab = tab;
  }
  
  selectInfo = 'info';
  selectActive(tab:string): void{
    this.selectInfo = tab;
  }
  constructor() { }

  ngOnInit() {
  }

}
