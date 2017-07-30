import { Component, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { VariantState } from './variant/variant-state.model';
import { FeatureGroup } from './variant/feature/feature-group.model';
import { VariantPriceService } from './variant-price.service';

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

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
  providers: [ VariantPriceService ],
})
export class OfferConfiguratorComponent implements OnInit {

  variants: Variant[] = [{
    name: 'First',
    state: VariantState.SELECTED,
    featureGroups: SAMPLE_FEATURE_GROUPS,
    price: 10,
  }, {
    name: 'Second',
    state: VariantState.ENABLED,
    featureGroups: SAMPLE_FEATURE_GROUPS,
    price: 15,
  }, {
    name: 'Third',
    state: VariantState.DISABLED,
    featureGroups: SAMPLE_FEATURE_GROUPS,
    price: 20,
  }];

  constructor(private variantPriceService: VariantPriceService) { }

  ngOnInit() {
  }

  onSelected(selectedVariant: Variant) {
    this.variants
      .filter(variant => variant.state === VariantState.SELECTED)
      .forEach(variant => variant.state = VariantState.ENABLED);
    selectedVariant.state = VariantState.SELECTED;
  }

  onFeatureBlur(variant: Variant) {
    this.variantPriceService.calculatePrice$(variant)
      .subscribe(calculatedVariant => variant.price = calculatedVariant.price);
  }

}
