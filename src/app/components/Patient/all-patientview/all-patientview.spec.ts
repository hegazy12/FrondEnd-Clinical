import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatientview } from './all-patientview';

describe('AllPatientview', () => {
  let component: AllPatientview;
  let fixture: ComponentFixture<AllPatientview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPatientview],
    }).compileComponents();

    fixture = TestBed.createComponent(AllPatientview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
