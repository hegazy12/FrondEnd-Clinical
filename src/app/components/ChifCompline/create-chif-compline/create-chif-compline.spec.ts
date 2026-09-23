import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChifCompline } from './create-chif-compline';

describe('CreateChifCompline', () => {
  let component: CreateChifCompline;
  let fixture: ComponentFixture<CreateChifCompline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChifCompline],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChifCompline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
