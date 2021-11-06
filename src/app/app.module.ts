import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FooterComponent} from './components/footer/footer.component';
import {MenubarModule} from "primeng/menubar";
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {HomeComponent} from './pages/home/home.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {UploadFileComponent} from './pages/upload-file/upload-file.component';
import {EntryDetailComponent} from './pages/entry-detail/entry-detail.component';
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {EntryListComponent} from './components/entry-list/entry-list.component';
import {TruncateMultihashPipe} from './pipes/truncate-multihash.pipe';
import {CalendarModule} from "primeng/calendar";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import { ProtoDetailComponent } from './pages/proto-detail/proto-detail.component';
import {DropdownModule} from "primeng/dropdown";
import { RepoChunksComponent } from './pages/repo-chunks/repo-chunks.component';
import { RepoTreesComponent } from './pages/repo-trees/repo-trees.component';
import { RepoCommitsComponent } from './pages/repo-commits/repo-commits.component';
import { LinkListComponent } from './components/link-list/link-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    WelcomeComponent,
    HomeComponent,
    UploadFileComponent,
    EntryDetailComponent,
    EntryListComponent,
    TruncateMultihashPipe,
    ProtoDetailComponent,
    RepoChunksComponent,
    RepoTreesComponent,
    RepoCommitsComponent,
    LinkListComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MenubarModule,
        FileUploadModule,
        HttpClientModule,
        ToastModule,
        MessageModule,
        MessagesModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        TableModule,
        PanelModule,
        CalendarModule,
        TagModule,
        DialogModule,
        DropdownModule,
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
