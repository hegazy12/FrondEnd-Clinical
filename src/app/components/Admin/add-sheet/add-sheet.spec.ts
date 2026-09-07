import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheet } from './add-sheet';

describe('AddSheet', () => {
  let component: AddSheet;
  let fixture: ComponentFixture<AddSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
