import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router)
  {
  }

  canActivate() {
    if (JSON.parse(window.localStorage.getItem('auth_user')).isAdmin != true) {
      this.router.navigate(['/pages/dashboard']);
    }
    return true;
  }
}
