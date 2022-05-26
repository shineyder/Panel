import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  NbComponentStatus,
  NbMenuService,
  NbSidebarService,
  NbToastrService
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import {
  filter,
  takeUntil
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../pages/home-adm/models/user.model';
import { StorageService } from '../../../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  user: User

  currentTheme = 'default';

  userMenu = [/* { title: 'Profile' }, */ { title: 'Sair' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private userAuthService: AuthService,
    private localStorageService: StorageService,
    private toastrService: NbToastrService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.userAuthService.getUserAuthenticated()
    .pipe(takeUntil(this.destroy$))
    .subscribe(user => {
      this.localStorageService.set('auth_user', user)
      this.user = user
    }, error => {
      this.localStorageService.clear()
      this.router.navigate(['auth/login']);
    });

    this.menuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'userMenu'),
      takeUntil(this.destroy$),
    )
    .subscribe((menu: any) => {
      switch (menu.item.title) {
        case 'Sair':
          this.userAuthService.doLogout()
          break;
        default:
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  showMessage(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, { status });
  }
}
