import { TestBed } from '@angular/core/testing';

import { MiscellaneousSalesService } from './miscellaneous-sales.service';

describe('MiscellaneousSalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiscellaneousSalesService = TestBed.get(MiscellaneousSalesService);
    expect(service).toBeTruthy();
  });
});
