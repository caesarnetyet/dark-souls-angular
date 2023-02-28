import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Notification, Message} from "../interfaces/notification";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  properties: Notification = {
    message: {},
    color: 'green',
    title: 'Titulo de prueba'
  }

  notificationChanged: Subject<Notification> = new Subject<Notification>();
  constructor() { }

    updateNotification(message: string | Message, color: string = 'green', title: string = '') {

    if (typeof message === 'string') {
      this.properties.message = {message: message};
    } else {
      this.properties.message = message;
    }
    this.properties.color = color;
    this.properties.title = title;
    this.notificationChanged.next(this.properties);
  }


}
