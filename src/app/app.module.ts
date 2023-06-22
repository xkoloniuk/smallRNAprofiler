import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FileUploadModule} from "primeng/fileupload";
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {StatusHeaderComponent} from './status-header/status-header.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {TablePlotsComponent} from './table-plots/table-plots.component';
import {RouterModule} from "@angular/router";
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {ChartModule} from "primeng/chart";
import {CoverageMappingComponent} from './coverage-mapping/coverage-mapping.component';
import {SizeDistributionComponent} from './size-distribution/size-distribution.component';
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    StatusHeaderComponent,
    TablePlotsComponent,
    WelcomePageComponent,
    CoverageMappingComponent,
    SizeDistributionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    CheckboxModule,
    FormsModule,
    RouterModule,
    ChartModule,
    DividerModule,
    ChipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
