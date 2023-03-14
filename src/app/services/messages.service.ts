import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Notification, Message} from "../interfaces/notification";
import {socket} from "../env/socket";


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


    listenSocket(){
      socket.on('addedClass', (data: string) =>{
        console.log(data)
        this.updateNotification("La clase"+ data + "ha sido agregada", 'green', 'Clase agregada')
      })
      socket.on('deletedClass', (data: string) =>{
        console.log(data)
        this.updateNotification("la clase" + data + "ha sido eliminada", 'red', 'Clase eliminada')
      });

    }

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
