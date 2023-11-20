import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private _appService: AppService) {}

  canActivate(): Observable<boolean> {
    console.log('LoginGuard');
    if (this._appService.token !== '') {
      return this._appService.validateToken(this._appService.token).pipe(
        map((isValid: boolean) => {
          if (isValid) {
            console.log('Valid token');
            this.router.navigate(['/management']);
            return false;
          } else {
            console.log('Invalid token');
            this._appService.logout();
            return true;
          }
        })
      );
    } else {
      console.log('No token');
      this._appService.loadNavbar = false;
      return of(true); // Cambiado a true para permitir acceso al login
    }
  }
}