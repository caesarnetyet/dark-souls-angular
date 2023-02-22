import { Component } from '@angular/core';
import {CharacterService} from "../../../services/character.service";

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {
  constructor(characterService: CharacterService) { }

}
