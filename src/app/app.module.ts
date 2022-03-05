import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule, NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {RouterModule} from "@angular/router";
import {FooterComponent} from './components/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from "@nebular/auth";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {FormsModule} from "@angular/forms";
import {DashboardIndexComponent} from './components/dashboard-index/dashboard-index.component';
import {environment} from "../environments/environment";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth-guard.service";
import {DurationPipe} from './pipes/duration.pipe';
import {ListConfigComponent} from './components/dashboard/maintenance/list-config/list-config.component';
import {CertDetailsComponent} from './components/dashboard/cert/cert-details/cert-details.component';
import {ListCertComponent} from './components/dashboard/cert/list-cert/list-cert.component';
import {NewCertComponent} from './components/dashboard/cert/new-cert/new-cert.component';
import {UserDetailsComponent} from './components/dashboard/user/user-details/user-details.component';
import {ListUserComponent} from './components/dashboard/user/list-user/list-user.component';
import {NewUserComponent} from './components/dashboard/user/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginPageComponent,
    DashboardIndexComponent,
    DashboardComponent,
    DurationPipe,
    ListConfigComponent,
    CertDetailsComponent,
    ListCertComponent,
    NewCertComponent,
    UserDetailsComponent,
    ListUserComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: 'info',
      duration: 15000,
      hasIcon: false
    }),
    NbButtonModule,
    HttpClientModule,
    NbAlertModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          token: {
            class: NbAuthJWTToken,
            key: "token"
          },
          baseEndpoint: environment.backendBase,
          login: {
            endpoint: "/public/auth",
            method: "post",
            defaultErrors: ['Wrong credentials, please try again.'],
            redirect: {
              success: "/dashboard",
            }
          }
        }),
      ],
      forms: {
        login: {
          rememberMe: false
        },
        validation: {
          minLength: 1,
          maxLength: 255
        }
      },
    }),
    FormsModule,
    NbInputModule,
    NbIconModule,
    NbCardModule,
    NbMenuModule.forRoot(),
    NbListModule,
    NbAccordionModule,
    NbActionsModule,
    NbSelectModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
