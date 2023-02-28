import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Model} from "../../interfaces/model";
import { UserService } from 'src/app/services/user/user.service';
import {Anchor} from "../../interfaces/anchor";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements  OnInit{
  users: Model<User>[] = []
  anchors: Anchor[] = []

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.getUsers()
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }
}
