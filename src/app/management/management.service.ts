import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { AppService } from '../app.service';
import { stateRequest } from './models/enum';
import {
  TransformEmployeesPipe,
  TransformProductionsPipe,
  TransformProductsPipe,
  TransformRolesPipe,
} from './management.pipes';
import { employee, product, production, role } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  baseUrl = 'https://escorcia21.pythonanywhere.com/api';
  baseRetry: number = 3;

  constructor(private http: HttpClient, private _appService: AppService) {}

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

  public stateGetEmployees: number = stateRequest.notExcuted;
  public employeesInfo: Array<employee> = [];
  public _infoEmployeesObservable: Subject<employee[]> = new Subject<
    employee[]
  >();
  public loadingEmployees: Boolean = false;


  getEmployees(): Observable<any> {
    this.loadingEmployees = true;
    const url =
      `${this.baseUrl}/users?pageSize=1000&startIndex=0&` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetEmployees = status
          ? stateRequest.excuted
          : stateRequest.error;
        if (status) {
          const employeePipe = new TransformEmployeesPipe();
          const temp = employeePipe.transform(data);
          this.employeesInfo = temp;
          this._infoEmployeesObservable.next(this.employeesInfo);
          this.loadingEmployees = false;
        }
        return { valid: status, print: this.employeesInfo };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('getEmployees', []))
    );
  }

  createEmployee(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/users?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const employeePipe = new TransformEmployeesPipe();
          const temp = employeePipe.transform([data]);
          console.log(temp);
          this.employeesInfo = [...this.employeesInfo, ...temp];
          this._infoEmployeesObservable.next(this.employeesInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('createEmployee', []))
    );
  }

  editEmployee(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/users?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.put(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const employeePipe = new TransformEmployeesPipe();
          const temp = employeePipe.transform([data]);
          this.employeesInfo.forEach((employee: employee, index: number) => {
            if (employee.cc === data.cc) {
              this.employeesInfo[index] = temp[0];
            }
          });
          this._infoEmployeesObservable.next(this.employeesInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('editEmployee', []))
    );
  }

  public stateGetRoles: number = stateRequest.notExcuted;
  public rolesInfo: Array<role> = [];
  public _infoRolesObservable: Subject<role[]> = new Subject<role[]>();
  public loadingRoles: Boolean = false;


  getRoles(): Observable<any> {
    this.loadingRoles = true;
    const url =
      `${this.baseUrl}/roles?pageSize=1000&startIndex=0&` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetRoles = status
          ? stateRequest.excuted
          : stateRequest.notExcuted;
        if (status) {
          const rolesPipe = new TransformRolesPipe();
          const temp = rolesPipe.transform(data);
          this.rolesInfo = temp;
          this._infoRolesObservable.next(this.rolesInfo);
          this.loadingRoles = false;
        }
        return { valid: status, print: this.rolesInfo };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('getEmployees', []))
    );
  }

  createRole(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/roles?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const rolesPipe = new TransformRolesPipe();
          const temp = rolesPipe.transform([data]);
          this.rolesInfo = [...this.rolesInfo, ...temp];
          this._infoRolesObservable.next(this.rolesInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('createRole', []))
    );
  }

  editRole(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/roles?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.put(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const rolesPipe = new TransformRolesPipe();
          const temp = rolesPipe.transform([data]);
          this.rolesInfo.forEach((role: role, index: number) => {
            if (role.roleId === data.roleId) {
              this.rolesInfo[index] = temp[0];
            }
          });
          this._infoRolesObservable.next(this.rolesInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('editRole', []))
    );
  }

  public stateGetProduction: number = stateRequest.notExcuted;
  public productionInfo: Array<production> = [];
  public _infoProductionObservable: Subject<production[]> = new Subject<
    production[]
  >();
  public loadingProduction: Boolean = false;
  // public _infoAclObservable: Subject<{ method: number; acl: any }> =
  //   new Subject<{ method: number; acl: any }>();

  getProductions(): Observable<any> {
    this.loadingProduction = true;
    const url =
      `${this.baseUrl}/${
        this._appService.isAdmin
          ? `production?pageSize=1000&startIndex=0&`
          : `production/${this._appService.user_data.cc}?startProductionDate=2021-01-01&endProductionDate=2024-12-31&`
      }` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetProduction = status
          ? stateRequest.excuted
          : stateRequest.notExcuted;
        if (status) {
          const productionPipe = new TransformProductionsPipe();
          const temp = productionPipe.transform(data);
          this.productionInfo = temp;
          this._infoProductionObservable.next(this.productionInfo);
          this.loadingProduction = false;
        }
        return { valid: status, print: this.productionInfo };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('getEmployees', []))
    );
  }

  createProduction(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/production?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          this.getProductions().subscribe((response) => {});
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('createProduction', []))
    );
  }

  public stateGetProducts: number = stateRequest.notExcuted;
  public productsInfo: Array<product> = [];
  public _infoProductsObservable: Subject<product[]> = new Subject<product[]>();
  public loadingProducts: Boolean = false;


  getProducts(): Observable<any> {
    this.loadingProducts = true;
    const url =
      `${this.baseUrl}/products?pageSize=1000&startIndex=0&` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetProducts = status
          ? stateRequest.excuted
          : stateRequest.notExcuted;
        if (status) {
          const productPipe = new TransformProductsPipe();
          const temp = productPipe.transform(data);
          this.productsInfo = temp;
          this._infoProductsObservable.next(this.productsInfo);
          this.loadingProduction = false;
        } else {
          this._infoProductsObservable.next([]);
        }
        return { valid: status, print: this.productsInfo };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('getEmployees', []))
    );
  }

  createProduct(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/products?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const productPipe = new TransformProductsPipe();
          const temp = productPipe.transform([data]);
          this.productsInfo = [...this.productsInfo, ...temp];
          this._infoProductsObservable.next(this.productsInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('createProduct', []))
    );
  }

  editProduct(data: any): Observable<any> {
    const url =
      `${this.baseUrl}/products?` +
      'Authorization=Bearer ' +
      this._appService.token;
    return this.http.put(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          const productPipe = new TransformProductsPipe();
          const temp = productPipe.transform([data]);
          this.productsInfo.forEach((product: product, index: number) => {
            if (product.productId === data.productId) {
              this.productsInfo[index] = temp[0];
            }
          });
          this._infoProductsObservable.next(this.productsInfo);
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>('editProduct', []))
    );
  }

  clearData(): void {
    this.stateGetEmployees = stateRequest.notExcuted;
    this.employeesInfo = [];
    this._infoEmployeesObservable.next([]);
    this.loadingEmployees = false;

    this.stateGetRoles = stateRequest.notExcuted;
    this.rolesInfo = [];
    this._infoRolesObservable.next([]);
    this.loadingRoles = false;

    this.stateGetProduction = stateRequest.notExcuted;
    this.productionInfo = [];
    this._infoProductionObservable.next([]);
    this.loadingProduction = false;

    this.stateGetProducts = stateRequest.notExcuted;
    this.productsInfo = [];
    this._infoProductsObservable.next([]);
    this.loadingProducts = false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
