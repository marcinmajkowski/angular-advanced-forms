import { TestBed, inject } from '@angular/core/testing';

import { VariantLimitsService } from './variant-limits.service';

describe('VariantLimitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariantLimitsService]
    });
  });

  it('should be created', inject([VariantLimitsService], (service: VariantLimitsService) => {
    expect(service).toBeTruthy();
  }));
});
