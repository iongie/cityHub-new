import { TestBed } from '@angular/core/testing';

import { PropertyInformationService } from './property-information.service';

describe('PropertyInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyInformationService = TestBed.get(PropertyInformationService);
    expect(service).toBeTruthy();
  });
});
