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

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _appService: AppService) {}
  canActivate(): Observable<boolean> {
    //if there is no userdata wait whit the observable an cvheck if isamin is true
    if (!this._appService.user_data) {
      return new Observable<boolean>((observer) => {
        let interval = setInterval(() => {
          if (this._appService.user_data) {
            if (this._appService.isAdmin) {
              observer.next(true);
            } else {
              this.router.navigate(['/management/production']);
              observer.next(false);
            }
            clearInterval(interval);
          }
        }, 100);
      });
    } else {
      if (this._appService.isAdmin) {
        return of(true);
      } else {
        this.router.navigate(['/management/production']);
        return of(false);
      }
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductionGuard implements CanActivate {
  constructor(private router: Router, private _appService: AppService) {}
  canActivate(): Observable<boolean> {
    //if there is no userdata wait whit the observable an cvheck if isamin is true
    if (!this._appService.user_data?.cc) {
      return new Observable<boolean>((observer) => {
        let interval = setInterval(() => {
          if (this._appService.user_data) {
            observer.next(true);
            clearInterval(interval);
          }
        }, 100);
      });
    } else {
      return of(true);
    }
  }
}