import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaveMainQuestion } from './list-save-main-question';

describe('ListSaveMainQuestion', () => {
  let component: ListSaveMainQuestion;
  let fixture: ComponentFixture<ListSaveMainQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSaveMainQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSaveMainQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
