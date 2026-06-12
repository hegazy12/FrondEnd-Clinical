import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppintment } from './list-appintment';

describe('ListAppintment', () => {
  let component: ListAppintment;
  let fixture: ComponentFixture<ListAppintment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAppintment],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAppintment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
