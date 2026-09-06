import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitaialInvestgation } from './ditaial-investgation';

describe('DitaialInvestgation', () => {
  let component: DitaialInvestgation;
  let fixture: ComponentFixture<DitaialInvestgation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DitaialInvestgation],
    }).compileComponents();

    fixture = TestBed.createComponent(DitaialInvestgation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
