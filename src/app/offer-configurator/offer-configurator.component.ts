import { Component, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { FeatureGroup } from './variant/feature/feature-group.model';
import { VariantPriceService } from './variant-price.service';
import 'rxjs/add/operator/finally';

const SAMPLE_FEATURE_GROUPS: FeatureGroup[] = [{
  name: 'First group',
  features: [{
    name: 'Feature one',
    value: 100,
    min: 0,
    max: 1000,
  }, {
    name: 'Feature two',
    value: 200,
    min: 0,
    max: 1000,
  }]
}, {
  name: 'Second group',
  features: [{
    name: 'Feature three',
    value: 300,
    min: 0,
    max: 1000,
  }, {
    name: 'Feature four',
    value: 400,
    min: 0,
    max: 1000,
  }, {
    name: 'Feature five',
    value: 500,
    min: 0,
    max: 1000,
  }]
}];

const SAMPLE_VARIANTS: Variant[] = [{
  name: 'First',
  isDisabled: false,
  featureGroups: SAMPLE_FEATURE_GROUPS,
  price: null,
}, {
  name: 'Second',
  isDisabled: false,
  featureGroups: SAMPLE_FEATURE_GROUPS,
  price: null,
}, {
  name: 'Third',
  isDisabled: false,
  featureGroups: SAMPLE_FEATURE_GROUPS,
  price: null,
}];

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
  providers: [ VariantPriceService ],
})
export class OfferConfiguratorComponent implements OnInit {

  variants: Variant[];

  selectedVariant: Variant;

  constructor(private variantPriceService: VariantPriceService) { }

  ngOnInit() {
    this.variants = SAMPLE_VARIANTS;
    this.selectedVariant = this.variants[0];
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
    this.selectedVariant = variant;
  }

  onFeatureBlur(variant: Variant) {
    // TODO recalculate only if changed
    this.calculateVariant(variant);
  }
}
