import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainQuestion } from './create-main-question';

describe('CreateMainQuestion', () => {
  let component: CreateMainQuestion;
  let fixture: ComponentFixture<CreateMainQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMainQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMainQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
