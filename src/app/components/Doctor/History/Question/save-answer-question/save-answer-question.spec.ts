import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAnswerQuestion } from './save-answer-question';

describe('SaveAnswerQuestion', () => {
  let component: SaveAnswerQuestion;
  let fixture: ComponentFixture<SaveAnswerQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveAnswerQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveAnswerQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
