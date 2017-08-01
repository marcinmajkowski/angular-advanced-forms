import { Component, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { FeatureGroup } from './variant/feature/feature-group.model';
import { VariantPriceService } from './variant-price.service';
import { VariantLimitsService } from './variant-limits.service';
import 'rxjs/add/operator/finally';

function sampleFeatureGroups(): FeatureGroup[] {
  return [{
    name: 'First group',
    features: [{
      name: 'Feature one',
      description: 'No limits',
      value: 100,
      min: null,
      max: null,
    }, {
      name: 'Feature two',
      description: '1 - 2 of feature one',
      value: 200,
      min: null,
      max: null,
    }]
  }, {
    name: 'Second group',
    features: [{
      name: 'Feature three',
      description: '0 - 0.5 of feature two',
      value: 300,
      min: null,
      max: null,
    }, {
      name: 'Feature four',
      value: 400,
      min: null,
      max: null,
    }, {
      name: 'Feature five',
      value: 500,
      min: null,
      max: null,
    }]
  }];
}

const SAMPLE_VARIANTS: Variant[] = [{
  name: 'First',
  isDisabled: false,
  featureGroups: sampleFeatureGroups(),
  price: null,
}, {
  name: 'Second',
  isDisabled: false,
  featureGroups: sampleFeatureGroups(),
  price: null,
}, {
  name: 'Third',
  isDisabled: false,
  featureGroups: sampleFeatureGroups(),
  price: null,
}];

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
  providers: [ VariantPriceService, VariantLimitsService ],
})
export class OfferConfiguratorComponent implements OnInit {

  variants: Variant[];

  selectedVariant: Variant;

  constructor(private variantPriceService: VariantPriceService,
              private variantLimitsService: VariantLimitsService) { }

  ngOnInit() {
    this.variants = SAMPLE_VARIANTS;
    this.selectedVariant = this.variants[0];
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
    this.selectedVariant = variant;
  }

  onFeatureChange(variant: Variant) {
    this.calculateVariant(variant);
  }

  // FIXME controls lose focus
  // https://stackoverflow.com/questions/42322968/angular2-dynamic-input-field-lose-focus-when-input-changes
  onVariantUpdate(variantIndex: number, updatedVariant: Variant) {
    this.variants[variantIndex].featureGroups = updatedVariant.featureGroups;
    this.variantLimitsService.calculateLimits(this.variants[variantIndex]);
  }
}
