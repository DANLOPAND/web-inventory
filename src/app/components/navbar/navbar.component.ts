import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public _appService: AppService
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this._appService.logout();
    window.location.reload();
  }
}
