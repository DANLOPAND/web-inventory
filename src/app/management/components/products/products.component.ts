import { Component, ViewChild } from '@angular/core';
import { product } from '../../models/models';
import { ModalComponent } from '../modal/modal.component';
import { ManagementService } from '../../management.service';
import { AppService } from 'src/app/app.service';
import { configPopup } from 'src/app/components/pop-ups/pop-ups.model';
import { stateRequest } from '../../models/enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    './../../../styles/font-awesome.scss',
  ],
})
export class ProductsComponent {
  @ViewChild(ModalComponent) _modal: ModalComponent | undefined;

  constructor(
    public _managementService: ManagementService,
    private _appService: AppService
  ) {}

  public loading: boolean = true;

  public selectedFilter = 0;
  public ascendent: boolean = true;
  public searchQuery: string = '';

  public configPopup = configPopup;
  public configModal: number = -1;

  public selectedProduct: product | undefined;

  private stateRequest = stateRequest;

  ngOnInit(): void {
    this.getProducts();
    this._appService.loadNavbar = true;
  }

  getProducts(): void {
    if (
      this._managementService.stateGetProducts === this.stateRequest.notExcuted
    ) {
      if (this._managementService.loadingProducts) {
        this._managementService._infoProductsObservable.subscribe((data) => {
          this.loading = false;
        });
      } else {
        this._managementService.getProducts().subscribe((data) => {
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
    this.configModal = 4;
    this._modal?.openModal();
  }

  openEditModal(product: product) {
    this.selectedProduct = product;
    this.configModal = 5;
    this._modal?.openModal();
  }
}
