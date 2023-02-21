import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() name!: string;
  @Input() email!: string;
  @Input() password!: string;
  @Input() confirmPassword!: string;
  @Input() telefono!: string;
  constructor(private location: Location)
  {

  }
  goBack(): void {
    this.location.back();
  }
}
