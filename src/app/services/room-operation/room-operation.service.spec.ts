import { TestBed } from '@angular/core/testing';

import { RoomOperationService } from './room-operation.service';

describe('RoomOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomOperationService = TestBed.get(RoomOperationService);
    expect(service).toBeTruthy();
  });
});
