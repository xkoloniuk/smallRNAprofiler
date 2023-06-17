import { TestBed } from '@angular/core/testing';

import { FastaReaderService } from './fasta-reader.service';

describe('FastaReaderService', () => {
  let service: FastaReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastaReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
