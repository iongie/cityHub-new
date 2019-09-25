import { TestBed } from '@angular/core/testing';

import { NightAuditService } from './night-audit.service';

describe('NightAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NightAuditService = TestBed.get(NightAuditService);
    expect(service).toBeTruthy();
  });
});
