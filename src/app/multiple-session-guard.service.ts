import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { StorageService } from './storage.service';

@Injectable()
export class MultipleSessionGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private localStorageService: StorageService
    ) {
  }

  canActivate() {
    if (this.localStorageService.get('auth_app_token') != null) {
      this.router.navigate(['/pages/dashboard']);
      this.toastrService.show('Encerre a sessão atual antes de iniciar uma nova sessão!', 'Alerta!', { status: 'warning' })
    }
    return true;
  }
}
