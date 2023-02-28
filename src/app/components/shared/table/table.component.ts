import {Component, Input, OnInit} from '@angular/core';
import {Model} from "../../../interfaces/model";

import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: Model<object>[] = [];
  updateRow?: Model<object>;

  constructor(private userService: UserService ) {}


  async ngOnInit() {
  }

  getFields(model: Object) {
    return Object.values(model)
  }
  getHeaders(header: object) : string[]{
    return Object.keys(header)
  }

  update(row: Model<object>) {
    this.updateRow = row
  }

  delete(delete_url: string) {
    this.userService.delete(delete_url).subscribe(
      (data) => console.log(data)
    )
    }

}
