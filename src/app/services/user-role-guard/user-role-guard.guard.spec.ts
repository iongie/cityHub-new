import { TestBed, async, inject } from '@angular/core/testing';

import { UserRoleGuardGuard } from './user-role-guard.guard';

describe('UserRoleGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRoleGuardGuard]
    });
  });

  it('should ...', inject([UserRoleGuardGuard], (guard: UserRoleGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
