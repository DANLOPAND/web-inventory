import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web-inventory';

  constructor(public _appService: AppService) {
  }

  ngOnInit() {
    this._appService.token = localStorage.getItem('token') || '';
  }
}
