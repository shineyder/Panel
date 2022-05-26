import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { tap } from 'rxjs/operators';

@Injectable()
export class MultipleSessionGuard implements CanActivate {

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            this.router.navigate(['pages/dashboard']);
            this.toastrService.show('Encerre a sessão atual antes de iniciar uma nova sessão!', 'Alerta!', { status: 'warning' })
          }
        }),
      );
  }
}
