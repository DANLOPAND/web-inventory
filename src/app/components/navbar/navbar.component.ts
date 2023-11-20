import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ManagementService } from 'src/app/management/management.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public _appService: AppService,
    public _router: Router,
    public _managementService: ManagementService
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this._appService.logout();
    this._managementService.clearData();
    this._router.navigate(['/login']);
  }
}
