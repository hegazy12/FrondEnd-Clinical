import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStory } from './appointment-story';

describe('AppointmentStory', () => {
  let component: AppointmentStory;
  let fixture: ComponentFixture<AppointmentStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentStory],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentStory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
