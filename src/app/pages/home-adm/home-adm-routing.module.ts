import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeAdmComponent } from './home-adm.component';
import { UserReadComponent } from './read/user-read.component';



const routes: Routes = [
  {
    path: '',
    component: HomeAdmComponent,
  },
  {
    path: 'read/:id',
    component: UserReadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdmRoutingModule {
}
