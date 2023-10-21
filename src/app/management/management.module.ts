import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    RouterModule
  ]
})
export class ManagementModule { }
