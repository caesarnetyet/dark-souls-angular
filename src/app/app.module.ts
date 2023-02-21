import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './components/notification/notification.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { RegisterComponent } from './components/register/register.component';
import { ChibiComponent } from './components/chibi/chibi.component';

import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { TableComponent } from './components/shared/table/table.component';
import { UserComponent } from './components/user/user.component';
import { FormComponent } from './components/shared/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotificationComponent,
    RegisterComponent,
    ChibiComponent,
    DashboardComponent,
    TableComponent,
    UserComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
