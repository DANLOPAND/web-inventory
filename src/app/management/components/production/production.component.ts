import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManagementService } from '../../management.service';
import { PopupService } from 'src/app/components/pop-ups/pop-ups.service';
import { stateRequest } from '../../models/enum';
import { configPopup } from 'src/app/components/pop-ups/pop-ups.model';
import { production } from '../../models/models';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: [
    './production.component.scss',
    './../../../styles/font-awesome.scss',
  ],
})
export class ProductionComponent implements OnInit {
  @ViewChild(ModalComponent) _infoModal: ModalComponent | undefined;
  @ViewChild(ModalComponent) _Addmodal: ModalComponent | undefined;

  public loading: boolean = true;

  public selectedFilter = 0;
  public ascendent: boolean = true
  ;
  public searchQuery: string = '';

  public configPopup = configPopup;
  public configModal: number = -1;

  private stateRequest = stateRequest;
  public selectedProduction: production | undefined;

  constructor(
    public _managementService: ManagementService,
    private _popupService: PopupService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this.getProductions();
    this._appService.loadNavbar = true;
  }

  getProductions(): void {
    console.log(this._managementService.stateGetProduction);
    if (
      this._managementService.stateGetProduction ===
      this.stateRequest.notExcuted
    ) {
      if (this._managementService.loadingProduction) {
        this._managementService._infoProductionObservable.subscribe((data) => {
          this.loading = false;
        });
      } else {
        this._managementService.getProductions().subscribe((response) => {
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

  openInfoModal() {
    this.configModal = 0;
    this._infoModal?.openModal();
  }

  openAddModal() {
    this.configModal = 1;
    this._Addmodal?.openModal();
  }

  selectProduction(production: production) {
    this.selectedProduction = Object.assign({}, production);
    this.openInfoModal();
  }
}
