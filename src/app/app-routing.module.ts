import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginGuard} from "./guards/login.guard";
import {UploadFolderComponent} from "./components/upload/upload-folder/upload-folder.component";
import {UploadFileComponent} from "./components/upload/upload-file/upload-file.component";
import {EntryDetailComponent} from "./components/entry-detail/entry-detail.component";

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
    path: 'upload',
    canActivate: [LoginGuard],
    children: [
      {
        path: 'file',
        component: UploadFileComponent
      },
      {
        path: 'folder',
        component: UploadFolderComponent
      },
    ]
  },
  {
    path: 'entry/:name',
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
