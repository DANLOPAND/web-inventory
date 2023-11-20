import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { ManagementRoutingModule } from './management.routing.module';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormsModule } from '@angular/forms';
import { FilterEmployeesPipe, FilterProductionsPipe, FilterProductsByRolePipe, FilterProductsPipe, FilterRolesPipe } from './management.pipes';
import { RolesComponent } from './components/roles/roles.component';
import { ProductionComponent } from './components/production/production.component';
import { ProductsComponent } from './components/products/products.component';
import { ModalComponent } from './components/modal/modal.component';
import { ComboboxComponent } from '../components/combobox/combobox.component';
import { InputNumberComponent } from '../components/input-number/input-number.component';



@NgModule({
  declarations: [
    ManagementComponent,
    SearchBarComponent,
    EmployeesComponent,
    RolesComponent,
    ProductionComponent,
    ProductsComponent,
    FilterEmployeesPipe,
    FilterRolesPipe,
    FilterProductionsPipe,
    ModalComponent,
    ComboboxComponent,
    InputNumberComponent,
    FilterProductsByRolePipe,
    FilterProductsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ManagementRoutingModule,
    FormsModule,
  ]
})
export class ManagementModule { }
