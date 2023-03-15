import { HttpClient} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { API_URL } from 'src/app/env/endpoint';


@Component({
  selector: 'app-uptime',
  templateUrl: './uptime.component.html',
  styleUrls: ['./uptime.component.css']
})
export class UptimeComponent implements OnInit {
  uptime = 0
  active = false
  constructor(private http: HttpClient) {
    setInterval(() => {
      this.http.get(API_URL+'/uptime').subscribe((data: any) => {
        this.uptime = data
        this.active = true
      })
    }, 60000)
  }
  ngOnInit(): void {
    this.http.get(API_URL+'/uptime').subscribe((data: any) => {
      this.uptime = data
      this.active = true
    })
  }
}
