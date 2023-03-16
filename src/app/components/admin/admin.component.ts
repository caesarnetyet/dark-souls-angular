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
    this.userService.users.subscribe((data) => this.users = data)
    setInterval(() => {
      console.log('logging users')
      this.userService.updateUsers()
    }, 5000)
    this.userService.updateUsers()

  }

  updateUser($row: Model<User>) {
    const characterIndex = this.users.findIndex((character) => character.id === $row.id)
    this.users[characterIndex] = $row
    this.userService.updateUsers()
  }

  deleteUser($row: string) {
    this.users = this.users.filter((character) => character.actions.delete_url !== $row);
    this.userService.updateUsers()
  }
}
