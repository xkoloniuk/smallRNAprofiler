import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {FastaReaderService} from "../fasta-reader.service";
import processNameSeqData from "../../util/util";

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

  constructor(private messageService: MessageService, private fastaReader: FastaReaderService) {


  }

  onSelect(event: any) {
    for (let file of event.files) {
      this.selectedFiles.push({key: file.name, file: file});
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  customHandler(files: File[]) {
    this.showProgressBar = true;
    files.forEach((file: File) => {
      this.fastaReader.readFastaFile(file).then(data => {
        this.showProgressBar = false;
        return processNameSeqData(data)
      })
    })
  }
}
