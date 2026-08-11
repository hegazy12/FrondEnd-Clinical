import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVital } from './list-vital';

describe('ListVital', () => {
  let component: ListVital;
  let fixture: ComponentFixture<ListVital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVital],
    }).compileComponents();

    fixture = TestBed.createComponent(ListVital);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
