import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {DashboardIndexComponent} from "./components/dashboard-index/dashboard-index.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {ListConfigComponent} from "./components/dashboard/maintenance/list-config/list-config.component";
import {CertDetailsComponent} from "./components/dashboard/cert/cert-details/cert-details.component";
import {ListCertComponent} from "./components/dashboard/cert/list-cert/list-cert.component";
import {NewCertComponent} from "./components/dashboard/cert/new-cert/new-cert.component";
import {UserDetailsComponent} from "./components/dashboard/user/user-details/user-details.component";
import {ListUserComponent} from "./components/dashboard/user/list-user/list-user.component";
import {NewUserComponent} from "./components/dashboard/user/new-user/new-user.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardIndexComponent
      },
      {
        path: "user/list_user",
        component: ListUserComponent
      },
      {
        path: "user/new_user",
        component: NewUserComponent
      },
      {
        path: "user/details/:username",
        component: UserDetailsComponent
      },
      {
        path: "cert/sign_new",
        component: NewCertComponent
      },
      {
        path: "cert/management",
        component: ListCertComponent
      },
      {
        path: "cert/details/:number",
        component: CertDetailsComponent
      },
      {
        path: "maintenance/configurations",
        component: ListConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
