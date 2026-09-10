import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHistory } from './add-history';

describe('AddHistory', () => {
  let component: AddHistory;
  let fixture: ComponentFixture<AddHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
