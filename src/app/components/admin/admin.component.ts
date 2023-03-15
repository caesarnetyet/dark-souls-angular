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
    this.userService.getUsers().subscribe(users => {
      this.users = users
      console.log(users)
    })
  }
  updateUser($row: Model<User>) {
    const characterIndex = this.users.findIndex((character) => character.id === $row.id)
    this.users[characterIndex] = $row
  }

  deleteUser($row: string) {
    this.users = this.users.filter((character) => character.actions.delete_url !== $row);
  }
}
