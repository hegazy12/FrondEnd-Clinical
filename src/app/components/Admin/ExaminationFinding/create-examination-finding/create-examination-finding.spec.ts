import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExaminationFinding } from './create-examination-finding';

describe('CreateExaminationFinding', () => {
  let component: CreateExaminationFinding;
  let fixture: ComponentFixture<CreateExaminationFinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExaminationFinding],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExaminationFinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
