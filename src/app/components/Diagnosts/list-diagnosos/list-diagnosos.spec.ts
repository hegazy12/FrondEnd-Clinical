import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiagnosos } from './list-diagnosos';

describe('ListDiagnosos', () => {
  let component: ListDiagnosos;
  let fixture: ComponentFixture<ListDiagnosos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDiagnosos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDiagnosos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
