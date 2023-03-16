import { TestBed } from '@angular/core/testing';

import { UserCommunityService } from './user-community.service';

describe('UserCommunityService', () => {
  let service: UserCommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
