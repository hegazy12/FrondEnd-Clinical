import { TestBed } from '@angular/core/testing';

import { VerfivationToken } from './verfivation-token';

describe('VerfivationToken', () => {
  let service: VerfivationToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerfivationToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
