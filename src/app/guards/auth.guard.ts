import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

import {UserService} from "../services/user/user.service";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user ?: User;
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean> {
    this.userService.getUser().subscribe(user => this.user = user);
    console.log(this.user)
    if (this.user) {
      const role = route.data['requiredRole'];
      if (this.user.role === role) {
        return true;
      }
      await this.router.navigate([`/dashboard${this.user.role}`]);
      return false;

    }
    await this.router.navigate(['/chibi']);
    return false
  }

}
