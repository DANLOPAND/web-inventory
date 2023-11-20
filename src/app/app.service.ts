import { Inject, Injectable, Injector, NgModuleFactory } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Router,
  Event,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class AppService {
  public token: string = '';

  public loadNavbar: boolean = false;

  baseUrl = 'https://escorcia21.pythonanywhere.com/api';
  baseRetry: number = 3;
  Authorization = 'Authorization=Bearer ';

  isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return { headers: headers };
  }

  post(url: any, formData: FormData) {
    return this.http.post(url, formData, this.getHeaders());
  }

  put(url: any, formData: FormData) {
    return this.http.put(url, formData, this.getHeaders());
  }

  delete(url: any) {
    return this.http.delete(url, this.getHeaders());
  }

  public user_data: any;

  login(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth`;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  validateToken(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/verify?` + this.Authorization + data;
    return this.http.post(url, '', this.getHeaders()).pipe(
      map((response: any) => {
        if (response) {
          this.token = data;
          this.getUser(response.cc);
        }
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  public userObservable = new Subject<any>();

  getUser(id: any) {
    const url =
      `${this.baseUrl}/users/${id}?` + this.Authorization + this.token;
    this.http.get(url, this.getHeaders()).subscribe((response: any) => {
      this.user_data = response.data;
      this.isAdmin = this.user_data.cc === '123456789';
      this.loadNavbar = true;
      this.userObservable.next(this.user_data);
    });
  }

  logout() {
    this.token = '';
    this.user_data = {};
    this.isAdmin = false;
  }
}
