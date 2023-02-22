import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { UserService } from "../services/user/user.service";
import { User } from "../interfaces/user";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((user: User) => {
        console.log(user);
        if (user) {
          const role = route.data['requiredRole'];

          if (user.role === role) {
            return true;
          } else {
            this.router.navigate([`/dashboard/${user.role}`]);
            return false;
          }
        } else {
          this.router.navigate(['/chibi']);
          return false;
        }
      })
    );
  }
}
