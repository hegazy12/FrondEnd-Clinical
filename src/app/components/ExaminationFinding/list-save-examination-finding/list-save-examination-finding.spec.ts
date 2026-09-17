import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaveExaminationFinding } from './list-save-examination-finding';

describe('ListSaveExaminationFinding', () => {
  let component: ListSaveExaminationFinding;
  let fixture: ComponentFixture<ListSaveExaminationFinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSaveExaminationFinding],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSaveExaminationFinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
