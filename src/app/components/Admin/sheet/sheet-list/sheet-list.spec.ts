import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetList } from './sheet-list';

describe('SheetList', () => {
  let component: SheetList;
  let fixture: ComponentFixture<SheetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetList],
    }).compileComponents();

    fixture = TestBed.createComponent(SheetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
