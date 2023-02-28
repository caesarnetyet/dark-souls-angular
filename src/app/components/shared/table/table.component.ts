import {Component, Input, OnInit} from '@angular/core';
import {Model} from "../../../interfaces/model";
import {ModelData} from "../../../interfaces/modelData";
import {UserService} from "../../../services/user/user.service";



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: Model<object>[] = [];
  headers?: string[] = [];
  updateRow?: Model<object>;

  constructor(private userService: UserService ) {}

  ngOnInit(): void {
    this.headers = this.getHeaders()
  }
  getHeaders(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0].attributes)
    }
    return []
  }

  getFields(model: Object) {
    return Object.values(model)
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
