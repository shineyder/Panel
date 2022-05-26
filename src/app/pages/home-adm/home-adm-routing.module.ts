import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeAdmComponent } from './home-adm.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdmRoutingModule {
}
