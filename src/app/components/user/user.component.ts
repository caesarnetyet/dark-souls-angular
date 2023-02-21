import {Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {Character} from "../../interfaces/character";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  anchors: Anchor[] = [
    {name: 'Agregar usuario', url: '/user/add'}
    ];
  characters: Model<Character>[] = []
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
   this.getCharacters()
    console.log(this.characters)
  }
  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters)
  }

}
