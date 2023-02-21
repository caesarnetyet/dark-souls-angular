import {Component, Input, OnInit} from '@angular/core';
import {Model} from "../../../interfaces/model";
import {ModelData} from "../../../interfaces/modelData";



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: Model<object>[] = [];
  headers?: string[] = [];


  constructor() { }

  ngOnInit(): void {
    this.headers = this.getHeaders()
  }
  getHeaders(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0].model)
    }
    return []
  }

  getFields(model: Object) {
    return Object.values(model)
  }


}
