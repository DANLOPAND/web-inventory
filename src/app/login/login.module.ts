import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagementRoutingModule } from '../management/management.routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
