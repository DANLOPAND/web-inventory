import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from '../../management.service';
import { PopupService } from 'src/app/components/pop-ups/pop-ups.service';
import { configPopup } from 'src/app/components/pop-ups/pop-ups.model';
import { stateRequest } from '../../models/enum';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss', './../../../styles/font-awesome.scss'],
})
export class ModalComponent implements OnInit, OnChanges {
  @Output() acceptEmit: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmit: EventEmitter<any> = new EventEmitter();
  @Input() configModal: number = -1;
  @Input() data: any;
  public extraData: any;
  public config: number = -1;
  public preventCloseModal: boolean = false;
  public showModal: boolean = false;
  public hiddenModal: boolean = false;
  public loading: boolean = false;

  public configPopup = configPopup;
  public stateRequest = stateRequest;

  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _managementService: ManagementService,
    public _popupService: PopupService,
    public _appService: AppService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.config = this.configModal;
    this.checkConfig();
  }

  cancelModal() {
    this.showModal = false;
    this.hiddenModal = true;
    document.body.classList.remove('modal-open');

    setTimeout(() => {
      this.data = undefined;
      this.extraData = undefined;
      this.config = -1;
    } , 200);
  }

  openModal() {
    console.log(this.configModal);
    this.config = this.configModal;
    this.checkConfig();
    this.showModal = true;
    this.hiddenModal = false;
    document.body.classList.add('modal-open');
  }

  acceptModalEmit() {
    this.acceptEmit.emit();
  }

  cancelModalEmit() {
    this.cancelModal();
    this.data = undefined;
    this.extraData = undefined;
    this.cancelEmit.emit();
  }

  checkConfig() {
    console.log(this.config);
    switch (this.config) {
      case 0:
        break;
      case 1:
        this.data = {};
        this.extraData = {};
        this.getEmployees();
        this.getProducts();
        break;
      case 2:
        this.data = {
          userType: '',
        };
        this.extraData = {};
        break;
      case 3:
        this.extraData = Object.assign({}, this.data);
        break;
      case 4:
        this.data = {};
        this.extraData = {};
        this.getRoles();
        break;
      case 5:
        this.data = Object.assign({}, this.data);
        this.data.unitCompensation = this.data.unitCompensation * 100;
        this.data.packageCompensation = this.data.packageCompensation * 100;
        this.extraData = Object.assign({}, this.data);
        this.getRoles();
        break;
        case 6:
          this.data = {};
          this.extraData = {};
          this.getRoles();
          break;
        case 7:
          this.data = Object.assign({}, this.data);
          this.extraData = Object.assign({}, this.data);
          this.getRoles();
          break;
      default:
        this.preventCloseModal = false;
        break;
    }
  }

  onEmployeeSelected(event: any) {
    this.data['employeeId'] = event.cc;
    this.extraData['employee'] = event;
    const temp = Object.assign({}, this.extraData);
    this.extraData = undefined;
    this.extraData = temp;
  }

  onProductSelected(event: any) {
    this.data['productId'] = event.productId;
    this.extraData['product'] = event;
    const temp = Object.assign({}, this.extraData);
    this.extraData = undefined;
    this.extraData = temp;
  }

  onRoleSelected(event: any) {
    if (this.config === 4) {
      this.data['productRoleId'] = event.roleId;
      this.extraData['productRole'] = event;
    }
    if (this.config === 6) {
      this.data['roleId'] = event.roleId;
      this.extraData['role'] = event;
    }
    this.extraData['role'] = event;
    const temp = Object.assign({}, this.extraData);
    this.extraData = undefined;
    this.extraData = temp;
  }

  onAmountChanged(event: any) {
    this.data['amount'] = event;
  }

  onCompensationChanged(event: any, isUnit: boolean) {
    if (this.config === 4) {
      if (isUnit) {
        this.data['unitCompensation'] = event / 100;
      } else {
        this.data['packagesCompensation'] = event / 100;
      }
    } else {
      if (isUnit) {
        this.extraData['unitCompensation'] = event;
      } else {
        this.extraData['packageCompensation'] = event;
      }
    }
  }

  getEmployees(): void {
    if (this._appService.isAdmin) {
      if (
        this._managementService.stateGetEmployees ===
        this.stateRequest.notExcuted
      ) {
        if (!this._managementService.loadingEmployees) {
          this._managementService.getEmployees().subscribe((response) => {
            if (!response.valid) {
              this._popupService.addPopup({
                content: 'No se han podido obtener los empleados',
                seconds: 5,
                autoClose: true,
                type: this.configPopup.ERROR,
              });
            } else {
              if (this.config === 5) {
                this.extraData.role = this._managementService.rolesInfo.find(
                  (role) => role.roleId === this.extraData.productRoleId
                );
              }
            }
          });
        }
      }
    } else {
      this.onEmployeeSelected(this._appService.user_data);
    }
  }

  getProducts(): void {
    if (
      this._managementService.stateGetProducts === this.stateRequest.notExcuted
    ) {
      if (!this._managementService.loadingProducts) {
        this._managementService.getProducts().subscribe((response) => {
          if (!response.valid) {
            this._popupService.addPopup({
              content: 'No se han podido obtener los productos',
              seconds: 5,
              autoClose: true,
              type: this.configPopup.ERROR,
            });
          }
        });
      }
    }
  }

  getRoles(): void {
    if (
      this._managementService.stateGetRoles === this.stateRequest.notExcuted
    ) {
      if (!this._managementService.loadingRoles) {
        this._managementService.getRoles().subscribe((response) => {
          if (!response.valid) {
            this._popupService.addPopup({
              content: 'No se han podido obtener los roles',
              seconds: 5,
              autoClose: true,
              type: this.configPopup.ERROR,
            });
          }
        });
      }
    }
  }

  createProduction(): void {
    this.loading = true;
    this.data['productionDate'] = new Date().toISOString().split('T')[0];
    this._managementService
      .createProduction(this.data)
      .subscribe((response) => {
        if (response.valid) {
          this._popupService.addPopup({
            content: 'La producción se ha creado correctamente',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.SUCCESS,
          });
          this.cancelModal();
          this.loading = false;
        } else {
          this._popupService.addPopup({
            content: 'No se ha podido crear la producción',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.ERROR,
          });
          this.loading = false;
        }
      });
  }

  createRole(): void {
    this.loading = true;
    this._managementService.createRole(this.data).subscribe((response) => {
      if (response.valid) {
        this._popupService.addPopup({
          content: 'El rol se ha creado correctamente',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.SUCCESS,
        });
        this.cancelModal();
        this.loading = false;
      } else {
        this._popupService.addPopup({
          content: 'No se ha podido crear el rol',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.ERROR,
        });
        this.loading = false;
      }
    });
  }

  createProduct(): void {
    this.loading = true;
    this._managementService.createProduct(this.data).subscribe((response) => {
      if (response.valid) {
        this._popupService.addPopup({
          content: 'El producto se ha creado correctamente',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.SUCCESS,
        });
        this.cancelModal();
        this.loading = false;
      } else {
        this._popupService.addPopup({
          content: 'No se ha podido crear el producto',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.ERROR,
        });
        this.loading = false;
      }
    });
  }

  createEmployee(): void {
    this.loading = true;
    this.data.password = this.data.cc;
    this._managementService.createEmployee(this.data).subscribe((response) => {
      if (response.valid) {
        this._popupService.addPopup({
          content: 'El empleado se ha creado correctamente',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.SUCCESS,
        });
        this.cancelModal();
        this.loading = false;
      } else {
        this._popupService.addPopup({
          content: 'No se ha podido crear el empleado',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.ERROR,
        });
        this.loading = false;
      }
    });
  }

  editRole(): void {
    this.loading = true;
    this._managementService.editRole(this.extraData).subscribe((response) => {
      if (response.valid) {
        this._popupService.addPopup({
          content: 'El rol se ha editado correctamente',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.SUCCESS,
        });
        this.cancelModal();
        this.loading = false;
      } else {
        this._popupService.addPopup({
          content: 'No se ha podido editar el rol',
          seconds: 5,
          autoClose: true,
          type: this.configPopup.ERROR,
        });
        this.loading = false;
      }
    });
  }

  editProduct(): void {
    this.loading = true;
    let petition: any = {
      productId: this.extraData.productId,
      productRoleId: this.extraData.role ? this.extraData.role.roleId : this.extraData.productRole.roleId,
      productName: this.extraData.productName,
      price: this.extraData.price,
      unitCompensation: this.extraData.unitCompensation / 100,
      packagesCompensation: this.extraData.packageCompensation / 100,
    };

    this._managementService    
      .editProduct(petition)
      .subscribe((response) => {
        if (response.valid) {
          this._popupService.addPopup({
            content: 'El producto se ha editado correctamente',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.SUCCESS,
          });
          this.cancelModal();
          this.loading = false;
        } else {
          this._popupService.addPopup({
            content: 'No se ha podido editar el producto',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.ERROR,
          });
          this.loading = false;
        }
      });
  }

  editEmployee(): void {
    this.loading = true;
    let petition: any = {
      cc: this.extraData.cc,
      name: this.extraData.name,
      lastName: this.extraData.lastName,
      roleId: this.extraData.role ? this.extraData.role.roleId : this.extraData.roleId,
      password: this.extraData.cc,
    };
    this._managementService
      .editEmployee(petition)
      .subscribe((response) => {
        if (response.valid) {
          this._popupService.addPopup({
            content: 'El empleado se ha editado correctamente',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.SUCCESS,
          });
          this.cancelModal();
          this.loading = false;
        } else {
          this._popupService.addPopup({
            content: 'No se ha podido editar el empleado',
            seconds: 5,
            autoClose: true,
            type: this.configPopup.ERROR,
          });
          this.loading = false;
        }
      });
  }

  generatePDF(data: any = this.data) {
    const pdf = new jsPDF();

    // Información del empleado
    const employeeInfo = [['Employee', `${data.employee.name}`]];

    // Información del producto
    const productInfo = [
      ['Product', data.product.productName],
      ['Price', data.product.price],
    ];

    // Información de la producción
    const productionInfo = [
      ['Production ID', data.productionId],
      ['Production Date', data.productionDate],
    ];

    // Información de compensación
    const compensationInfo = [
      ['Compensation', data.compensation],
      ['Percentage', data.percentage],
    ];

    // Información total
    const totalInfo = [['Total', data.total]];

    // Construir la tabla
    const table = [
      ...employeeInfo,
      ...productInfo,
      ...productionInfo,
      ...compensationInfo,
      ...totalInfo,
    ];

    // Añadir la tabla al PDF
    autoTable(pdf, {
      margin: { top: 20 },
      head: [['Description', 'Value']],
      body: table,
    });

    // add barcode
    // add barcode from assets
    pdf.addImage('assets/R.jpg', 'jpg', 90, 90, 20, 10);

    // Guardar el PDF
    pdf.output('dataurlnewwindow');
  }
}
