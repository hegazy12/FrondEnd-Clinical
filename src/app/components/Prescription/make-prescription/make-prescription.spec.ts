import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePrescription } from './make-prescription';

describe('MakePrescription', () => {
  let component: MakePrescription;
  let fixture: ComponentFixture<MakePrescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakePrescription],
    }).compileComponents();

    fixture = TestBed.createComponent(MakePrescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
