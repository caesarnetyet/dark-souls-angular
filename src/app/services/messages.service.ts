import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = ''
  constructor() { }

  addMessage(message: string){
    this.message = message
  }

}
