import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { RoutingModule } from './production.routing.module';



@NgModule({
  declarations: [
    ProductionComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class ProductionModule { }
