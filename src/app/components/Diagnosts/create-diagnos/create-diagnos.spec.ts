import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnos } from './create-diagnos';

describe('CreateDiagnos', () => {
  let component: CreateDiagnos;
  let fixture: ComponentFixture<CreateDiagnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDiagnos],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDiagnos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
