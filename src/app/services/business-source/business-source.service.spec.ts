import { TestBed } from '@angular/core/testing';

import { BusinessSourceService } from './business-source.service';

describe('BusinessSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessSourceService = TestBed.get(BusinessSourceService);
    expect(service).toBeTruthy();
  });
});
