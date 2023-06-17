import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlotsComponent } from './table-plots.component';

describe('TablePlotsComponent', () => {
  let component: TablePlotsComponent;
  let fixture: ComponentFixture<TablePlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePlotsComponent]
    });
    fixture = TestBed.createComponent(TablePlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
