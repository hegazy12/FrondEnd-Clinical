import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatInvestgation } from './creat-investgation';

describe('CreatInvestgation', () => {
  let component: CreatInvestgation;
  let fixture: ComponentFixture<CreatInvestgation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatInvestgation],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatInvestgation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
