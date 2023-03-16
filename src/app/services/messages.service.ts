import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Notification, Message} from "../interfaces/notification";

import { HttpClient } from '@angular/common/http';
import {API_URL} from "../env/endpoint";


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
  constructor(private http: HttpClient) { }
  eventSource = new EventSource(API_URL + '/addclass');



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

  listenSource() {

    this.eventSource.addEventListener('new_class', event => {
      this.updateNotification(event.data, 'green', 'Clase Agregada')
    })

    this.eventSource.addEventListener('delete_class', event => {
      console.log(event.data)
      this.updateNotification(event.data, 'red', 'Clase Eliminada')
    })
  }




}
