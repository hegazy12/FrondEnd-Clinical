import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSaveMainQuestion } from './create-save-main-question';

describe('CreateSaveMainQuestion', () => {
  let component: CreateSaveMainQuestion;
  let fixture: ComponentFixture<CreateSaveMainQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSaveMainQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSaveMainQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
