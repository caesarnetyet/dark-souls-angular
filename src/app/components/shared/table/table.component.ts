import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model} from "../../../interfaces/model";

import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: Model<object>[] = [];

  @Input() select?: object[] = [];
  @Output() updateEvent = new EventEmitter<Model<any>>();
  @Output() deleteEvent = new EventEmitter<string>();
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
    this.updateEvent.emit(row)
  }

  delete(delete_url: string) {
    const response = confirm('¿Estas seguro de eliminar este registro?')
    if (response) {
      this.userService.delete(delete_url).subscribe(
        (data) => console.log(data)

      )
      this.deleteEvent.emit(delete_url)
    }

  }

}
