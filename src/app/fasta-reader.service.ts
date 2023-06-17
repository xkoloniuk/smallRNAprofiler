import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FastaReaderService {
  constructor() {
  }

  readFastaFile(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
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
