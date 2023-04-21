import { TestBed } from '@angular/core/testing';

import { BanknoteSumService } from './banknote-sum.service';

describe('BanknoteSumService', () => {
  let service: BanknoteSumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanknoteSumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
