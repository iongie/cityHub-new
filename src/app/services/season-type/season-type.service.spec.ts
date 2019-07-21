import { TestBed } from '@angular/core/testing';

import { SeasonTypeService } from './season-type.service';

describe('SeasonTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeasonTypeService = TestBed.get(SeasonTypeService);
    expect(service).toBeTruthy();
  });
});
