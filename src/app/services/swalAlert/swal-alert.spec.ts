import { TestBed } from '@angular/core/testing';

import { SwalAlert } from './swal-alert';

describe('SwalAlert', () => {
  let service: SwalAlert;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalAlert);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
