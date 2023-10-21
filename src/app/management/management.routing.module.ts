import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  { path: 'roles', loadChildren: ()=> import('./components/roles/roles.module').then(m => m.RolesModule)},
  { path: 'employees', loadChildren: ()=> import('./components/employees/employees.module').then(m => m.EmployeesModule)},
  { path: 'products', loadChildren: ()=> import('./components/products/products.module').then(m => m.ProductsModule)},
  { path: 'production', loadChildren: ()=> import('./components/production/production.module').then(m => m.ProductionModule)},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
