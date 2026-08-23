import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chattext } from './chattext';

describe('Chattext', () => {
  let component: Chattext;
  let fixture: ComponentFixture<Chattext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chattext],
    }).compileComponents();

    fixture = TestBed.createComponent(Chattext);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
