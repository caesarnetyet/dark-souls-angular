import {Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../interfaces/character";
import {Class} from "../../interfaces/class";

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

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
   this.getCharacters()

  }
  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters)
  }


  updateCharacter($row: Model<Character>) {
    const characterIndex = this.characters.findIndex((character) => character.id === $row.id)
    this.characters[characterIndex] = $row
  }

  deleteCharacter($row: string) {
    this.characters = this.characters.filter((character) => character.actions.delete_url !== $row);
  }
}
