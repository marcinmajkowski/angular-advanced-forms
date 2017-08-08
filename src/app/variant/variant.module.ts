import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantService } from './variant.service';
import { VariantPriceService } from './variant-price.service';
import { FeatureModule } from '../feature/feature.module';

@NgModule({
  imports: [
    CommonModule,
    FeatureModule,
  ],
  declarations: [],
  providers: [
    VariantPriceService,
    // TODO provide only VariantService
    VariantService
  ]
})
export class VariantModule {
}
