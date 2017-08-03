import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantService } from './variant.service';
import { VariantLimitsService } from './variant-limits.service';
import { VariantPriceService } from './variant-price.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VariantLimitsService,
    VariantPriceService,
    // TODO provide only VariantService
    VariantService
  ]
})
export class VariantModule {
}
