import { TestBed } from '@angular/core/testing';

import { RoomStatusService } from './room-status.service';

describe('RoomStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomStatusService = TestBed.get(RoomStatusService);
    expect(service).toBeTruthy();
  });
});
