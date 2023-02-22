import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChibiComponent } from './components/chibi/chibi.component';
import { CodigoComponent } from './components/codigo/codigo.component';
import { RegisterComponent } from './components/register/register.component';
import {UserComponent} from "./components/user/user.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AdminComponent} from "./components/admin/admin.component";
import {AuthGuard} from "./guards/auth.guard";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';


const routes: Routes = [
  {
    path: 'iniSesion', component: InicioSesionComponent
  },
  {
    path: 'verify', component: CodigoComponent
  },
  {
    path: 'chibi', component: ChibiComponent,
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', canActivate:[AuthGuard] ,children: [
      {path: 'user', component: UserComponent, data:{requiredRole: 'user'}},
      {path: 'employee', component: EmployeeComponent, data:{requiredRole: 'employee'}},
      {path: 'admin', component: AdminComponent, data:{requiredRole: 'admin'}}
    ]
  },
  {
    path: 'notFound', component : NotFoundComponent
  },
  {
    path: '**', redirectTo: 'notFound', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
