import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../interfaces/character";
import {socket} from "../../env/socket";



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
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.characterService.characters.subscribe((data) => this.characters = data)
    this.characterService.updateCharacters()
    this.listenSocket()
  }

  listenSocket( ){
    socket.on('updateCharacter', (data: any) => {
      console.log(data)
      this.characterService.getCharacters().subscribe((characters) => {
        this.characters = characters
        this.cd.detectChanges();
      })
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
