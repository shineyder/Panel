import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private router: Router)
  {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    var data = JSON.parse(window.localStorage.getItem('auth_user')).resourcePermissions
    .find(x => x.resource.slug == route.url)

    if (data == undefined) {
      this.router.navigate(['/pages/dashboard']);
    }

    if (data.view != true) {
      this.router.navigate(['/pages/dashboard']);
    }
    return true;
  }
}
