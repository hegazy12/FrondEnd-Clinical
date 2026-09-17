import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExaminationFinding } from './list-examination-finding';

describe('ListExaminationFinding', () => {
  let component: ListExaminationFinding;
  let fixture: ComponentFixture<ListExaminationFinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExaminationFinding],
    }).compileComponents();

    fixture = TestBed.createComponent(ListExaminationFinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
