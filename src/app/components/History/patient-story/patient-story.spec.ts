import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStory } from './patient-story';

describe('PatientStory', () => {
  let component: PatientStory;
  let fixture: ComponentFixture<PatientStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientStory],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientStory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
