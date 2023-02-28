import { Component } from '@angular/core';
import {API_URL} from "../../../env/endpoint";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  model  = {
    name: '',
  }
  path = API_URL + '/class'

}
