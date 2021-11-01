import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginGuard} from "./guards/login.guard";
import {UploadFileComponent} from "./pages/upload-file/upload-file.component";
import {EntryDetailComponent} from "./components/entry-detail/entry-detail.component";
import {VersioningComponent} from "./pages/versioning/versioning.component";
import {EntryRepoComponent} from "./pages/entry-repo/entry-repo.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'repo',
    component: EntryRepoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'upload',
    canActivate: [LoginGuard],
    component: UploadFileComponent,
  },
  {
    path: 'versioning',
    canActivate: [LoginGuard],
    component: VersioningComponent
  },
  {
    path: 'entry/:uuid',
    component: EntryDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
