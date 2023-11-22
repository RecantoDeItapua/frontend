import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
name = '';
condition:boolean = true
  constructor() {}

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
    if(localStorage.getItem('id') === '224') {
      this.showTamplate()
    }
  }

  showTamplate() {
    this.condition = false
  }
}


