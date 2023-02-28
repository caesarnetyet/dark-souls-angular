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
import {AddCharacterComponent} from "./components/characters/add-character/add-character.component";
import {AddClassComponent} from "./components/employee/add-class/add-class.component";


const routes: Routes = [
  {
    path: 'login', component: InicioSesionComponent
  },
  {

    path: 'verify', component: CodigoComponent
  },
  {
    path: 'chibi', component: ChibiComponent,
  },

  {
    path: '', redirectTo: 'chibi', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard',  children: [
      {path: 'user', canActivate:[AuthGuard],component: UserComponent, data:{requiredRole: 'user'},
        children:
          [
          {path: 'add', component: AddCharacterComponent}
        ]
      },
      {path: 'employee', canActivate:[AuthGuard],component: EmployeeComponent, data:{requiredRole: 'employee'},
        children:
          [
          {path: 'add', component: AddClassComponent}
        ]
      },
      {path: 'admin', canActivate:[AuthGuard], component: AdminComponent, data:{requiredRole: 'admin'}}
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
