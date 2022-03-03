import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbAlertModule, NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {RouterModule} from "@angular/router";
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {NbAuthModule, NbPasswordAuthStrategy} from "@nebular/auth";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
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
    NbButtonModule,
    HttpClientModule,
    NbAlertModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          baseEndpoint: "",
          login: {
            endpoint: "/api/public/auth",
            method: "post"
          }
        }),
      ],
      forms: {
        login: {
          rememberMe: false
        }
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
