import { TestBed } from '@angular/core/testing';

import { Callapi } from './callapi';

describe('Callapi', () => {
  let service: Callapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Callapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
