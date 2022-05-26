import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { environment } from '../../environments/environment';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';

import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },

          baseEndpoint: environment.baseURL,
          login: {
            endpoint: '/auth/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
          },
          register: {
            endpoint: '/auth/register',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        register: {
          redirectDelay: 0,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          }
        },
      },
    }),
  ],
  declarations: [
    NgxLoginComponent,
    NgxRegisterComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class NgxAuthModule {
}
