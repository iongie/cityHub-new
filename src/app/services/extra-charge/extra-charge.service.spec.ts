import { TestBed } from '@angular/core/testing';

import { ExtraChargeService } from './extra-charge.service';

describe('ExtraChargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraChargeService = TestBed.get(ExtraChargeService);
    expect(service).toBeTruthy();
  });
});
