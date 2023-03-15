import {Component, OnInit} from '@angular/core';
import {Anchor} from "../../interfaces/anchor";
import {Model} from "../../interfaces/model";
import {Classes} from "../../interfaces/classes";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  anchors: Anchor[] = [
    {name: 'Agregar Clase', url: 'add'}
  ];
  classes: Model<Classes>[] = []

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.classes.subscribe((data) => this.classes = data)
    this.characterService.updateClasses()
  }



}
