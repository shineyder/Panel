import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbButtonModule,
  NbAccordionModule,
  NbCheckboxModule,
  NbListModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UserDeleteComponent } from './delete/user-delete.component';
import { HomeAdmRoutingModule } from './home-adm-routing.module';
import { HomeAdmComponent } from './home-adm.component';
import { UserUpdateComponent } from './update/user-update.component';
import { UserService } from './userService';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    HomeAdmRoutingModule,
    NbAccordionModule,
    NbButtonModule,
    NbCheckboxModule,
    NbListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeAdmComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ],
  providers: [
    UserService
  ],
})
export class HomeAdmModule { }
