import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneTraker } from './phone-traker';

describe('PhoneTraker', () => {
  let component: PhoneTraker;
  let fixture: ComponentFixture<PhoneTraker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneTraker],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneTraker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
