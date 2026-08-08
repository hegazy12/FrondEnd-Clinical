import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mypatient } from './mypatient';

describe('Mypatient', () => {
  let component: Mypatient;
  let fixture: ComponentFixture<Mypatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mypatient],
    }).compileComponents();

    fixture = TestBed.createComponent(Mypatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
