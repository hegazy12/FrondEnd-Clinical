import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDoctor } from './qrcode-doctor';

describe('QrcodeDoctor', () => {
  let component: QrcodeDoctor;
  let fixture: ComponentFixture<QrcodeDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
