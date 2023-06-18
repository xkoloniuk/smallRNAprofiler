import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {FileToTextReaderService} from "../services/file-to-text-reader.service";
import {FastaMappingToCoverageDetailService} from "../services/fasta-mapping-to-coverage-detail.service";
import {MappingService} from "../services/mapping.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {LinksService} from "../services/links.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [MessageService]
})
export class FileUploaderComponent {

  checkedFiles: any[] = [];
  selectedFiles: { key: string, file: File }[] = [];
  public showProgressBar = false;
  public mapObjects: any[] = [];
  private myValueSubject = new BehaviorSubject<boolean>(true);
  showPlotsLink$ = this.myValueSubject.asObservable();

  constructor(private messageService: MessageService, private fileReader: FileToTextReaderService, private fastaMappingToCoverage: FastaMappingToCoverageDetailService, private mappingService: MappingService, private router: Router, private linksService: LinksService) {
  }

  onSelect(event: any) {
    for (let file of event.files) {
      this.selectedFiles.push({key: file.name, file: file});
    }
  }

  async customHandler(files: File[]) {
    this.showProgressBar = true;

    files.forEach((file: File) => {
      this.fileReader.readFastaFile(file).then(data => {
        this.mapObjects.push(this.fastaMappingToCoverage.splitMultiFasta(data))
        this.mappingService.addMappings([this.fastaMappingToCoverage.splitMultiFasta(data)])
        this.showProgressBar = false;
        this.router.navigate(['../plots'])
      })
    })
  }


}
