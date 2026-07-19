import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListAppointment } from './doctor-list-appointment';

describe('DoctorListAppointment', () => {
  let component: DoctorListAppointment;
  let fixture: ComponentFixture<DoctorListAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorListAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
