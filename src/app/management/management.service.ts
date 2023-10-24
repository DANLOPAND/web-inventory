import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, retry } from "rxjs/operators";
import { AppService } from "../app.service";
import { stateRequest } from "./models/enum";
import { TransformEmployeesPipe } from "./pipes/employees.pipes";
import { employee, role } from "./models/models";

@Injectable({
  providedIn: "root",
})
export class  ManagementService {
  baseUrl = "https://escorcia21.pythonanywhere.com/api";
  Authorization = "Authorization=Bearer " + this._appService.token;
  baseRetry: number = 3;


  constructor(private http: HttpClient, private _appService: AppService) {}

  getHeaders(): any {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
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
  public _infoEmployeesObservable: Subject<employee[]> = new Subject<employee[]>();
  public loadingEmployees: Boolean = false;
  // public _infoAclObservable: Subject<{ method: number; acl: any }> =
  //   new Subject<{ method: number; acl: any }>();

  getEmployees(): Observable<any> {
    this.loadingEmployees = true;
    const url = `${this.baseUrl}/users?pageSize=1000&startIndex=0&`+this.Authorization;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetEmployees = status ? stateRequest.excuted : stateRequest.error;
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
      catchError(this.handleError<any>("getEmployees", []))
    );
  }

  // createAcl(businessId: string, data: any): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls`;
  //   return this.http.post(url, data, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       const { status, data } = response;
  //       if (status) {
  //         const aclsPipe = new TransformAclPipe();
  //         const tempAcls = []
  //         data.insert.forEach((acl: any) => {
  //           const tempAcl = aclsPipe.transform(acl.data);
  //           tempAcls.push(tempAcl);
  //         });

  //         return { valid: status, print: tempAcls };
  //       }
  //       return { valid: status, print: data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("createACLs", []))
  //   );
  // }

  // updateAcl(businessId: string, data: any): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls`;
  //   return this.http.post(url, data, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       return { valid: response.status, print: response.data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("updateAcl", []))
  //   );
  // }

  // deleteAcl(businessId: string, acl: Acl): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls/"${acl.id}"`;
  //   return this.http.delete(url, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       const { status, data } = response;
  //       if (status) {
  //         return { valid: status, print: acl };
  //       }
  //       return { valid: status, print: data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("deleteGroup", []))
  //   );
  // }

  public stateGetRoles: number = stateRequest.notExcuted;
  public rolesInfo: Array<role> = [];
  public _infoRolesObservable: Subject<role[]> = new Subject<role[]>();
  public loadingRoles: Boolean = false;
  // public _infoAclObservable: Subject<{ method: number; acl: any }> =
  //   new Subject<{ method: number; acl: any }>();

  getRoles(): Observable<any> {
    this.loadingEmployees = true;
    const url = `${this.baseUrl}/roles?pageSize=1000&startIndex=0&`+this.Authorization;
    return this.http.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        this.stateGetRoles = status ? stateRequest.excuted : stateRequest.error;
        if (status) {

          this.loadingRoles = false;
        }
        return { valid: status, print: this.rolesInfo };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>("getEmployees", []))
    );
  }

  createRole(data: any): Observable<any> {
    const url = `${this.baseUrl}/roles?`+this.Authorization;
    return this.http.post(url, data, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, data } = response;
        if (status) {
          return { valid: status, print: data };
        }
        return { valid: status, print: data };
      }),
      retry(this.baseRetry),
      catchError(this.handleError<any>("createRole", []))
    );
  }


  // createAcl(businessId: string, data: any): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls`;
  //   return this.http.post(url, data, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       const { status, data } = response;
  //       if (status) {
  //         const aclsPipe = new TransformAclPipe();
  //         const tempAcls = []
  //         data.insert.forEach((acl: any) => {
  //           const tempAcl = aclsPipe.transform(acl.data);
  //           tempAcls.push(tempAcl);
  //         });

  //         return { valid: status, print: tempAcls };
  //       }
  //       return { valid: status, print: data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("createACLs", []))
  //   );
  // }

  // updateAcl(businessId: string, data: any): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls`;
  //   return this.http.post(url, data, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       return { valid: response.status, print: response.data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("updateAcl", []))
  //   );
  // }

  // deleteAcl(businessId: string, acl: Acl): Observable<any> {
  //   const url = `${this.baseLambdaUrl}/business/"${businessId}"/acls/"${acl.id}"`;
  //   return this.http.delete(url, this.getHeaders()).pipe(
  //     map((response: any) => {
  //       const { status, data } = response;
  //       if (status) {
  //         return { valid: status, print: acl };
  //       }
  //       return { valid: status, print: data };
  //     }),
  //     retry(this.baseRetry),
  //     catchError(this.handleError<any>("deleteGroup", []))
  //   );
  // }

  private handleError<T>(operation = "operation", result?: T) {
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
