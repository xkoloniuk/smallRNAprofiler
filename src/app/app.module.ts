import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FileUploadModule} from "primeng/fileupload";
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {StatusHeaderComponent} from './status-header/status-header.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    StatusHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
