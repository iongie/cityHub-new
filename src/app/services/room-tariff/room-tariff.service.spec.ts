import { TestBed } from '@angular/core/testing';

import { RoomTariffService } from './room-tariff.service';

describe('RoomTariffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomTariffService = TestBed.get(RoomTariffService);
    expect(service).toBeTruthy();
  });
});
