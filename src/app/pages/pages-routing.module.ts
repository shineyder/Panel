import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from './role-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'homeAdm',
      canActivate: [RoleGuard],
      loadChildren: () => import('./home-adm/home-adm.module').then(m => m.HomeAdmModule),
    },
    {
      path: 'resource',
      loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
