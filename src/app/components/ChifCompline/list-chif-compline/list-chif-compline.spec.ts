import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChifCompline } from './list-chif-compline';

describe('ListChifCompline', () => {
  let component: ListChifCompline;
  let fixture: ComponentFixture<ListChifCompline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChifCompline],
    }).compileComponents();

    fixture = TestBed.createComponent(ListChifCompline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
