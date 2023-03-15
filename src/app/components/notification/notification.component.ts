import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Notification, Message} from "../../interfaces/notification";
import {socket} from "../../env/socket";

;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notification?: Notification

  constructor(private messageService: MessagesService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.messageService.notificationChanged.subscribe(notification => {
      this.notification = notification
      console.log(this.notification)
    })
    this.listenSocket()

  }

  listenSocket(){
    socket.on('addedClass', (data: string) =>{
      console.log(data)
      this.messageService.updateNotification("La clase"+ data + "ha sido agregada", 'green', 'Clase agregada')
      this.cd.detectChanges();
    })
    socket.on('deletedClass', (data: string) =>{
      console.log(data)
      this.messageService.updateNotification("la clase" + data + "ha sido eliminada", 'red', 'Clase eliminada')
      this.cd.detectChanges();
    });

  }
  changeShow() {
    this.notification = undefined
  }


}
