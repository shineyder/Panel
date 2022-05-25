import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../pages/home-adm/models/user.model';

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
    private userAuthService: AuthService) {
  }

  ngOnInit() {
    this.userAuthService.getUserAuthenticated().subscribe(user => {
      window.localStorage.setItem('auth_user', JSON.stringify(user))
      this.user = user
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
}
