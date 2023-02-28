import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Notification} from "../../interfaces/notification";
import {Validators} from "@angular/forms";
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
      console.log(this.notification.message)
    })

  }


  changeShow() {
    this.notification = undefined
  }
}
