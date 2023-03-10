import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import {map, Observable} from "rxjs";
import {MessagesService} from "../services/messages.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router,private messageService: MessagesService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((user) => {
        if (!user) {
          localStorage.removeItem('token')
          this.messageService.updateNotification('Usuario no logueado', 'red')
          this.router.navigate(['/chibi']).then(r => console.log(r));
          return false;
        }
        if (!user.attributes.active){
          localStorage.removeItem('token')
          this.messageService.updateNotification('Usuario no activo', 'red')
          this.router.navigate(['/chibi']).then(r => console.log(r));
          return false;
        }else{
          const role = route.data['requiredRole'];
          if (user.attributes.role === role) {
            return true;
          } else {
            this.router.navigate([`/dashboard/${user.attributes.role}`]).then(r => console.log(r));
            return false;
          }
        }

      })
    );
  }
}
