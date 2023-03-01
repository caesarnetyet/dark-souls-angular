import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../../../services/character.service";
import {Class} from "../../../interfaces/class";
import {FormBuilder, Validators} from "@angular/forms";

import {Location} from "@angular/common";
import {MessagesService} from "../../../services/messages.service";
import {Character} from "../../../interfaces/character";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
selector: 'app-add-character.ts',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit{

  characterForm = this.fb.group({
    name: ['', Validators.required],
    class: [0, Validators.required],
  })
  constructor(private characterService: CharacterService,
              private fb:FormBuilder,
              private location: Location,
              private router: Router,
              private messageService: MessagesService,

              private userService: UserService
              )   { }
  classes?: Class[];



ngOnInit(): void {
    this.getClasses()
    console.log(this.classes)
  }
  getClasses(): void {
    this.characterService.getClass().subscribe(classes => classes.length > 0
      ? this.classes = classes
      : this.goBack('No se encontraron clases'))
  }

  goBack(message: string = ''): void {
  if (message) {
    this.messageService.updateNotification(message, 'red', 'No encontrado')
  }
    this.location.back()
  }

  onSubmit() {
    console.log(this.characterForm.value)
    if (this.characterForm.invalid){
      console.log('invalid form')
    }
    if (this.characterForm.valid) {
      console.log('valid form')
      const character: Character = {
        name: this.characterForm.value.name ?? '',
        class_id: this.characterForm.value.class ?? 0
      }
      this.characterService.addCharacter(character).subscribe((() => {
        console.log('added character.ts')
        this.goBack()

      }))
    }
  }
}
