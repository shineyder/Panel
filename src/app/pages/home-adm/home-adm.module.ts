import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbButtonModule,
  NbAccordionModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UserDeleteComponent } from './delete/user-delete.component';
import { HomeAdmRoutingModule } from './home-adm-routing.module';
import { HomeAdmComponent } from './home-adm.component';
import { UserUpdateComponent } from './update/user-update.component';
import { UserService } from './userService';
import { UserReadComponent } from './read/user-read.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    HomeAdmRoutingModule,
    NbButtonModule,
    NbAccordionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeAdmComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    UserReadComponent,
  ],
  providers: [
    UserService
  ],
})
export class HomeAdmModule { }
