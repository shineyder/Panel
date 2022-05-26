import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { StorageService } from "../../storage.service";

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private localStorageService: StorageService
    )
  {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    var data = this.localStorageService.get('auth_user')

    if (data == null) {
      this.router.navigate(['/pages/dashboard']);
      this.toastrService.show('Dados do usuário não encontrados, faça login novamente!', 'Alerta!', { status: 'warning' })
    }

    data = data.resourcePermissions.find(x => x.resource.slug == route.url)

    if (data == undefined) {
      this.router.navigate(['/pages/dashboard']);
      this.toastrService.show('Você não tem permissão para acessar essa página!', 'Alerta!', { status: 'warning' })
    }

    if (data.view != true) {
      this.router.navigate(['/pages/dashboard']);
      this.toastrService.show('Você não tem permissão para acessar essa página!', 'Alerta!', { status: 'warning' })
    }
    return true;
  }
}
