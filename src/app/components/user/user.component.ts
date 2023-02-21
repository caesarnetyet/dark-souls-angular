import { Component } from '@angular/core';
import {Anchor} from "../../interfaces/anchor";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  anchors: Anchor[] = [
    {name: 'Agregar usuario', url: '/user/add'}
    ];
}
