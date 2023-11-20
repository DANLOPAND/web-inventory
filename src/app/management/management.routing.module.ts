import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
import { AdminGuard, ManagementGuard, ProductionGuard } from './management.guard';
import { EmployeesComponent } from './components/employees/employees.component';
import { RolesComponent } from './components/roles/roles.component';
import { ProductionComponent } from './components/production/production.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [ManagementGuard],
    children: [
      { path: 'roles', component: RolesComponent, canActivate: [AdminGuard] },
      { path: 'employees', component: EmployeesComponent, canActivate: [AdminGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
      { path: 'production', component: ProductionComponent, canActivate: [ProductionGuard] },
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
