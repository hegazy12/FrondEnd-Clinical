import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMainQuestion } from './list-main-question';

describe('ListMainQuestion', () => {
  let component: ListMainQuestion;
  let fixture: ComponentFixture<ListMainQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMainQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMainQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
