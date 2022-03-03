import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule, NbSidebarModule,
  NbThemeModule
} from '@nebular/theme';

import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {routes} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,

    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpClientModule,
    NbAlertModule,

    NbAuthModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class AuthModule {
}
