import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RoutingModule } from './roles.routing.module';



@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class RolesModule { }
