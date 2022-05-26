import {
  ExtraOptions,
  RouterModule,
  Routes
} from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { MultipleSessionGuard } from './multiple-session-guard.service';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [MultipleSessionGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: '',
    redirectTo: 'pages/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/dashboard'
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
