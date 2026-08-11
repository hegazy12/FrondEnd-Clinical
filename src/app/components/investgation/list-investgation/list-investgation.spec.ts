import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvestgation } from './list-investgation';

describe('ListInvestgation', () => {
  let component: ListInvestgation;
  let fixture: ComponentFixture<ListInvestgation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInvestgation],
    }).compileComponents();

    fixture = TestBed.createComponent(ListInvestgation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
