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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminComponent } from './components/admin/admin.component';
import {BearerInterceptor} from "./interceptors/bearer.interceptor";
import { CodigoComponent } from './components/codigo/codigo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { AddClassComponent } from './components/employee/add-class/add-class.component';

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
    CodigoComponent,
    FormComponent,
    EmployeeComponent,
    AdminComponent,
    NotFoundComponent,
    InicioSesionComponent,
    AddCharacterComponent,
    AddClassComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
