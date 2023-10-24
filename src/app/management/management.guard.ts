import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementGuard implements CanActivate {
  constructor(private router: Router, private _appService: AppService) {}

  canActivate(): Observable<boolean> {
    if (this._appService.token !== '') {
      return this._appService.validateToken(this._appService.token).pipe(
        map((response: any) => {
          if (response) {
            this._appService.loadNavbar = true;
            return true;
          } else {
            this._appService.loadNavbar = false;
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      this._appService.loadNavbar = false;
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}