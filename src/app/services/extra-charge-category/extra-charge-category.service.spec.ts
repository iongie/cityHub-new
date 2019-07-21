import { TestBed } from '@angular/core/testing';

import { ExtraChargeCategoryService } from './extra-charge-category.service';

describe('ExtraChargeCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraChargeCategoryService = TestBed.get(ExtraChargeCategoryService);
    expect(service).toBeTruthy();
  });
});
