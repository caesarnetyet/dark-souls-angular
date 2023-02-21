import {Component, Input} from '@angular/core';
import {Anchor} from "../../../interfaces/anchor";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 @Input() anchors: Anchor[] = [];
}
