import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dark-souls-angular';

  color: string = 'dato';
  authToken = localStorage.getItem('token');

  constructor(private Location: Location)
  {
  }
  eliminarToken()
  {
    localStorage.removeItem('token');
    this.Location.go('/login');
    location.reload();
  }
}
