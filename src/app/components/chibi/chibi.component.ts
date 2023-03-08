import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {UserService} from "../../services/user/user.service";
@Component({
  selector: 'app-chibi',
  templateUrl: './chibi.component.html',
  styleUrls: ['./chibi.component.css']
})
export class ChibiComponent implements OnInit{
  constructor(private location: Location, private userService: UserService) { }
  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('token') != null) {
      this.location.go('/dashboard/user');
      location.reload();
    }
  }
}
