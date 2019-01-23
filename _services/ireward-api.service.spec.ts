import { TestBed } from '@angular/core/testing';

import { IrewardApiService } from './ireward-api.service';

describe('IrewardApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IrewardApiService = TestBed.get(IrewardApiService);
    expect(service).toBeTruthy();
  });
});
