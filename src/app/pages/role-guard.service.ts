import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { StorageService } from "../storage.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private localStorageService: StorageService
    )
  {
  }

  canActivate() {
    var authUser = this.localStorageService.get('auth_user')
    if (authUser.isAdmin != true) {
      this.router.navigate(['/pages/dashboard']);
      this.toastrService.show('Você não tem permissão para acessar essa página!', 'Alerta!', { status: 'warning' })
    }
    return true;
  }
}
