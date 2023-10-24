import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ManagementGuard } from './management/management.guard';
import { LoginGuard } from './login/login.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AppService, ManagementGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
