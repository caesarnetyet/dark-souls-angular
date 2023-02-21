import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Notification} from "../interfaces/notification";
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  properties: Notification = {
    message: '',
    color: 'green',
    title: 'Titulo de prueba'
  }

  notificationChanged: Subject<Notification> = new Subject<Notification>();
  constructor() { }

    updateNotification(message: string, title: string = '',  color: string = 'green') {
    this.properties.message = message;
    this.properties.color = color;
    this.properties.title = title;
    this.notificationChanged.next(this.properties);
  }


}
