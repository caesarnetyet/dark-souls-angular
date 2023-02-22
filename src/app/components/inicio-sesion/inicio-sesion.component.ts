import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Login} from "../../interfaces/login";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  email?: string
  password?: string

  constructor(private userService: UserService, private router: Router, location: Location){}

  async submit(){
    if (this.email && this.password){
      this.userService.login({email: this.email, password: this.password} as Login).subscribe(
        (data) => {
          console.log(data)
          localStorage.setItem("token", data.token);
          location.reload();
          this.router.navigate(['/dashboard/user'])
        }
      )
    }
  }

  ngOnInit(): void {
      if (localStorage.getItem('token')){
        this.router.navigate(['/dashboard/user'])
      }
  }
}
