import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FooterComponent} from './components/footer/footer.component';
import {MenubarModule} from "primeng/menubar";
import {WelcomeComponent} from './components/welcome/welcome.component';
import {HomeComponent} from './components/home/home.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import { UploadFileComponent } from './components/upload/upload-file/upload-file.component';
import { UploadFolderComponent } from './components/upload/upload-folder/upload-folder.component';
import { EntryDetailComponent } from './components/entry-detail/entry-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    WelcomeComponent,
    HomeComponent,
    UploadFileComponent,
    UploadFolderComponent,
    EntryDetailComponent
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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
