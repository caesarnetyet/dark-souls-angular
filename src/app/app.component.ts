import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dark-souls-angular';
  messages: string[] = ['Mensaje 1', 'Mensaje 2', 'Mensaje 3'];
  color: string = 'dato';
  authToken = localStorage.getItem('token');
}
