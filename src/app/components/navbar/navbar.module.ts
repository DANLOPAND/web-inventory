import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ManagementRoutingModule } from 'src/app/management/management.routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
