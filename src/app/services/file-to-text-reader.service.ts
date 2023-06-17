import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileToTextReaderService {
  constructor() {
  }

  readFastaFile(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target?.result) {
          return
        }
        const fileContent = event.target?.result as string;
        const lines = fileContent.split('>');
        resolve(lines);
      };

      reader.onerror = () => {
        reject('Error reading file.');
      };
      reader.readAsText(file);

    });
  }
}
