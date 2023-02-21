import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() messages: string[] = [];
  @Input() color: string = 'red';
  @Input() show: boolean = true;
  @Input() title: string = 'Titulo de prueba';

  changeShow() {
    this.show = !this.show;
  }
}
