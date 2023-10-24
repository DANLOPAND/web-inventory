import { Component, OnInit } from '@angular/core';
import { employee } from '../../models/models';
import { ManagementService } from '../../management.service';
import { stateRequest } from '../../models/enum';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss', './../../../styles/font-awesome.scss']
})

export class EmployeesComponent implements OnInit{
  public employees: employee[] = [];
  public loading: boolean = true;

  public selectedFilter = 0;
  public ascendent: boolean = false;
  public searchQuery: string = "";


  private stateRequest = stateRequest;

  constructor(
    private _managementService: ManagementService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    const usersInfo = this._managementService.employeesInfo;
    console.log(usersInfo);

    if (this._managementService.stateGetEmployees === this.stateRequest.notExcuted) {
      if (this._managementService.loadingEmployees) {
        this._managementService._infoEmployeesObservable.subscribe((data) => {
          this.employees = data;
          this.loading = false;
        });
      } else {
        this._managementService
          .getEmployees()
          .subscribe((data) => {
            if (data.valid) {
              this.employees = data.print;
              this.loading = false;
            }
          });
      }
    } else {
      this.employees = usersInfo;
      this.loading = false;
    }
  }

  changeFilter(value: number) {
    if (this.selectedFilter == value) {
      this.ascendent = !this.ascendent;
    } else {
      this.ascendent = true;
    }

    this.selectedFilter = value;
  }
}
