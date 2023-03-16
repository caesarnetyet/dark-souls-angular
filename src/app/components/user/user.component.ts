import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../interfaces/character";
import {socket} from "../../env/socket";
import {API_URL} from "../../env/endpoint";
import {MessagesService} from "../../services/messages.service";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  anchors: Anchor[] = [
    {name: 'Agregar personaje', url: 'add'}
    ];
  characters: Model<Character>[] = []

  constructor(private characterService: CharacterService,
              private cd: ChangeDetectorRef,
              private messageService: MessagesService) { }

  ngOnInit(): void {

    this.characterService.characters.subscribe((data) => this.characters = data)
    this.characterService.updateCharacters()
    this.messageService.listenSource()
    socket.on('updateCharacter', (data: Model<Character>) => {
      console.log(data)
      this.characterService.updateCharacters()
      this.cd.detectChanges()
    })
  }



  updateCharacter($row: Model<Character>) {
    const characterIndex = this.characters.findIndex((character) => character.id === $row.id)
    this.characters[characterIndex] = $row

  }

  deleteCharacter($row: string) {
    this.characters = this.characters.filter((character) => character.actions.delete_url !== $row);
  }
}
