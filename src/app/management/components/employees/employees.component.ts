import { Component, OnInit, ViewChild } from '@angular/core';
import { employee } from '../../models/models';
import { ManagementService } from '../../management.service';
import { stateRequest } from '../../models/enum';
import { configPopup } from 'src/app/components/pop-ups/pop-ups.model';
import { PopupService } from 'src/app/components/pop-ups/pop-ups.service';
import { AppService } from 'src/app/app.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: [
    './employees.component.scss',
    './../../../styles/font-awesome.scss',
  ],
})
export class EmployeesComponent implements OnInit {
  @ViewChild(ModalComponent) _infoModal: ModalComponent | undefined;
  @ViewChild(ModalComponent) _Addmodal: ModalComponent | undefined;

  public loading: boolean = true;

  public selectedFilter = 0;
  public ascendent: boolean = true;
  public searchQuery: string = '';
  public selectedEmployee: employee | undefined;
  public configModal: number = -1;


  public configPopup = configPopup;

  private stateRequest = stateRequest;

  constructor(
    public _managementService: ManagementService,
    private _popupService: PopupService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this._appService.loadNavbar = true;
  }

  getEmployees(): void {
    if (
      this._managementService.stateGetEmployees === this.stateRequest.notExcuted
    ) {
      if (this._managementService.loadingEmployees) {
        this._managementService._infoEmployeesObservable.subscribe((data) => {
          this.loading = false;
        });
      } else {
        this._managementService.getEmployees().subscribe((response) => {
          if (response.valid) {
            this.loading = false;
          } else {
            this._popupService.addPopup({
              content: response.message,
              seconds: 5,
              autoClose: true,
              type: this.configPopup.ERROR,
            });
          }
        });
      }
    } else {
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

  onSearchQuery(searchText: any): void {
    this.searchQuery = searchText;
  }

  openEditModal(employee: employee) {
    this.selectedEmployee = employee;
    this.configModal = 7;
    this._infoModal?.openModal();
  }

  openAddModal() {
    console.log('openAddModal');
    this.configModal = 6;
    this._Addmodal?.openModal();
  }
}
