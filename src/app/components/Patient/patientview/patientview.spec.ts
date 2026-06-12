import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patientview } from './patientview';

describe('Patientview', () => {
  let component: Patientview;
  let fixture: ComponentFixture<Patientview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patientview],
    }).compileComponents();

    fixture = TestBed.createComponent(Patientview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
