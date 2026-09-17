import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaveExaminationFinding } from './add-save-examination-finding';

describe('AddSaveExaminationFinding', () => {
  let component: AddSaveExaminationFinding;
  let fixture: ComponentFixture<AddSaveExaminationFinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSaveExaminationFinding],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSaveExaminationFinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
