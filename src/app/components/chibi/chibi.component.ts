import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-chibi',
  templateUrl: './chibi.component.html',
  styleUrls: ['./chibi.component.css']
})
export class ChibiComponent {
  constructor(private location: Location) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('token') != null) {
      this.location.go('/dashboard/user');
      location.reload();
    }
  }
}
