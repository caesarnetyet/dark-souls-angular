import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChibiComponent } from './components/chibi/chibi.component';
import { RegisterComponent } from './components/register/register.component';
import {UserComponent} from "./components/user/user.component";


const routes: Routes = [
  {
    path: 'chibi', component: ChibiComponent,
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'user', component: UserComponent, children: [
    ]
  },
  {
    path: '**', redirectTo: 'chibi', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
