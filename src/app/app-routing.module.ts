import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginGuard} from "./guards/login.guard";
import {UploadFileComponent} from "./pages/upload-file/upload-file.component";
import {EntryDetailComponent} from "./pages/entry-detail/entry-detail.component";
import {ProtoDetailComponent} from "./pages/proto-detail/proto-detail.component";
import {RepoChunksComponent} from "./pages/repo-chunks/repo-chunks.component";
import {RepoTreesComponent} from "./pages/repo-trees/repo-trees.component";
import {RepoCommitsComponent} from "./pages/repo-commits/repo-commits.component";

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
    path: 'chunks',
    component: RepoChunksComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'trees',
    component: RepoTreesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'commits',
    component: RepoCommitsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'upload',
    canActivate: [LoginGuard],
    component: UploadFileComponent,
  },
  {
    path: 'entry/:uuid',
    component: EntryDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'proto/:multihash',
    canActivate: [LoginGuard],
    component: ProtoDetailComponent
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
