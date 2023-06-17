import {TestBed} from '@angular/core/testing';

import {FileToTextReaderService} from './file-to-text-reader.service';

describe('FastaReaderService', () => {
  let service: FileToTextReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileToTextReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
