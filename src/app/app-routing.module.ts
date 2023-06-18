import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {TablePlotsComponent} from "./table-plots/table-plots.component";

const routes: Routes = [
  {path: 'home', component: FileUploaderComponent},
  {path: 'plots', component: TablePlotsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
