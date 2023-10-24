import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { LoginGuard } from "./login.guard";


const routes: Routes = [
  // rutas secundarias de courses que necesitan al componente courses para visualizarse
  { path: "", component: LoginComponent,canActivate: [LoginGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
