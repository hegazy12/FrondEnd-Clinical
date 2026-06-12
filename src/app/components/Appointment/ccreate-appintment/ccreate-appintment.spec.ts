import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCreateAppintment } from './ccreate-appintment';

describe('CCreateAppintment', () => {
  let component: CCreateAppintment;
  let fixture: ComponentFixture<CCreateAppintment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCreateAppintment],
    }).compileComponents();

    fixture = TestBed.createComponent(CCreateAppintment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
