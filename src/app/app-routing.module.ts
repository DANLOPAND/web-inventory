import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule),
  },  {
    path: 'management',
    loadChildren: ()=> import('./management/management.module').then(m => m.ManagementModule),
  },
  { path: '**', redirectTo: 'management/employees' }
  // Otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
