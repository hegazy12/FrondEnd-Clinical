import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatVital } from './creat-vital';

describe('CreatVital', () => {
  let component: CreatVital;
  let fixture: ComponentFixture<CreatVital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatVital],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatVital);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
