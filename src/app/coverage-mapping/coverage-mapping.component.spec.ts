import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageMappingComponent } from './coverage-mapping.component';

describe('CoverageMappingComponent', () => {
  let component: CoverageMappingComponent;
  let fixture: ComponentFixture<CoverageMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverageMappingComponent]
    });
    fixture = TestBed.createComponent(CoverageMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
