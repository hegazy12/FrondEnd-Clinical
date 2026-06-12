import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addviduo } from './addviduo';

describe('Addviduo', () => {
  let component: Addviduo;
  let fixture: ComponentFixture<Addviduo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addviduo],
    }).compileComponents();

    fixture = TestBed.createComponent(Addviduo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
