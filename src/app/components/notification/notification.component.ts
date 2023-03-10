import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Notification, Message} from "../../interfaces/notification";

;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notification?: Notification

  constructor(private messageService: MessagesService) {
  }

  ngOnInit(): void {
    this.messageService.notificationChanged.subscribe(notification => {
      this.notification = notification
      console.log(this.notification)
    })
    this.messageService.listenSocket()

  }

  changeShow() {
    this.notification = undefined
  }


}
