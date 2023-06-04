import {Component} from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [MessageService]
})
export class FileUploaderComponent {

  checkedFiles: any[] = [];
  selectedFiles: { key: string, file: File }[] = [];

  constructor(private messageService: MessageService) {


  }

  onSelect(event: any) {
    console.log(event);
    console.dir(event);
    for (let file of event.files) {
      this.selectedFiles.push({key: file.name, file: file});
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  customHandler(files: any) {
    console.log(files)
  }
}
