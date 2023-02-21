import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Model} from "../interfaces/model";
import {Character} from "../interfaces/character";
import {LIST_CHARACTERS} from "../mock/listCharacters";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private messageService: MessagesService) {}

  getCharacters(): Observable<Model<Character>[]> {
    this.messageService.addMessage('Hero Service:  Personajes cargados satisfactoriamente')
    return of(LIST_CHARACTERS)
  }
}
