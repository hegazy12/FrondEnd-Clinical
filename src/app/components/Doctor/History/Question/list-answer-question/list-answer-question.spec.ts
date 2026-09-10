import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnswerQuestion } from './list-answer-question';

describe('ListAnswerQuestion', () => {
  let component: ListAnswerQuestion;
  let fixture: ComponentFixture<ListAnswerQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAnswerQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAnswerQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
