import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './components/notification/notification.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { ChibiComponent } from './components/chibi/chibi.component';
import { Routes } from '@angular/router';

const appRoute: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: '', component: ChibiComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotificationComponent,
    RegisterComponent,
    ChibiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
