import { Component, Input, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { VariantPriceService } from './variant-price.service';
import { VariantLimitsService } from './variant-limits.service';
import 'rxjs/add/operator/finally';
import { FeatureValueChangeEvent } from './variant/feature-value-change-event.model';
import { FeatureGroupDefinition } from '../feature/feature-group-definition.model';
import { VariantService } from '../variant/variant.service';

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
  providers: [ VariantPriceService, VariantLimitsService ],
})
export class OfferConfiguratorComponent implements OnInit {

  @Input()
  featureGroupDefinitions: FeatureGroupDefinition[];

  @Input()
  variants: Variant[];

  @Input()
  selectedVariantId: string;

  constructor(private variantPriceService: VariantPriceService,
              private variantLimitsService: VariantLimitsService,
              private variantService: VariantService) { }

  ngOnInit() {
    this.variants.forEach(variant => this.variantLimitsService.calculateLimits(variant));
    this.variants.forEach(variant => this.calculateVariant(variant));
  }

  calculateVariant(variant: Variant) {
    if (!variant.isDisabled) {
      variant.isDisabled = true;
      this.variantPriceService.calculatePrice$(variant)
        .finally(() => variant.isDisabled = false)
        .subscribe(calculatedVariant => variant.price = calculatedVariant.price);
    }
  }

  onSelected(variant: Variant) {
    this.variantService.updateSelectedVariantId(variant.id);
  }

  onFeatureChange(variant: Variant) {
    this.calculateVariant(variant);
  }

  onFeatureValueChange(variantIndex: number, event: FeatureValueChangeEvent) {
    const featureGroupIndex = event.featureGroupIndex;
    const featureIndex = event.featureIndex;
    this.variants[variantIndex].featureGroups[featureGroupIndex].features[featureIndex].value = event.newValue;
    this.variantLimitsService.calculateLimits(this.variants[variantIndex]);
  }
}
