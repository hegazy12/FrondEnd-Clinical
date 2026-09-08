import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestion } from './list-question';

describe('ListQuestion', () => {
  let component: ListQuestion;
  let fixture: ComponentFixture<ListQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
