import { TestBed, inject } from '@angular/core/testing';

import { VariantPriceService } from './variant-price.service';

describe('VariantPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariantPriceService]
    });
  });

  it('should be created', inject([VariantPriceService], (service: VariantPriceService) => {
    expect(service).toBeTruthy();
  }));
});
