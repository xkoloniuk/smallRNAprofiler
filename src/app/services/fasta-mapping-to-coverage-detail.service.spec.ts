import { TestBed } from '@angular/core/testing';

import { FastaMappingToCoverageDetailService } from './fasta-mapping-to-coverage-detail.service';

describe('FastaMappingToCoverageDetailService', () => {
  let service: FastaMappingToCoverageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastaMappingToCoverageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
