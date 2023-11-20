import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagementService } from '../../management.service';
import { role } from '../../models/models';
import { stateRequest } from '../../models/enum';
import { configPopup } from 'src/app/components/pop-ups/pop-ups.model';
import { ModalComponent } from '../modal/modal.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss', './../../../styles/font-awesome.scss',]
})
export class RolesComponent implements OnInit {
  @ViewChild(ModalComponent) _modal: ModalComponent | undefined;

  constructor(public _managementService: ManagementService,
    private _appService: AppService
    ) {}

  public loading: boolean = true;

  public selectedFilter = 0;
  public ascendent: boolean = true;
  public searchQuery: string = '';

  public configPopup = configPopup;
  public configModal: number = -1;

  public selectedRole: role | undefined;

  private stateRequest = stateRequest;

  ngOnInit(): void {
    this.getRoles();
    this._appService.loadNavbar = true;
  }

  getRoles(): void {
    if (
      this._managementService.stateGetRoles === this.stateRequest.notExcuted
    ) {
      if (this._managementService.loadingRoles) {
        this._managementService._infoRolesObservable.subscribe((data) => {
          this.loading = false;
        });
      } else {
        this._managementService.getRoles().subscribe((data) => {
          if (data.valid) {
            this.loading = false;
          }
        });
      }
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

  openAddModal() {
    this.configModal = 2;
    this._modal?.openModal();
  }

  openEditModal(role: role) {
    this.selectedRole = role;
    this.configModal = 3;
    this._modal?.openModal();
  }
}
