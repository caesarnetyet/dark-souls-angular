import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {DashboardComponent} from "./components/shared/dashboard/dashboard.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: '**', redirectTo: 'welcome', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
