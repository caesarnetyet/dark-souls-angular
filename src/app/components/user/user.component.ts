import {Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../interfaces/character";

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

}
