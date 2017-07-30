import { Component, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { VariantState } from './variant/variant-state.model';
import { FeatureGroup } from './variant/feature/feature-group.model';

const SAMPLE_FEATURE_GROUPS: FeatureGroup[] = [{
  name: 'First group',
  features: [{
    name: 'Feature one'
  }, {
    name: 'Feature two'
  }]
}, {
  name: 'Second group',
  features: [{
    name: 'Feature three'
  }, {
    name: 'Feature four'
  }, {
    name: 'Feature five'
  }]
}];

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss']
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

  constructor() { }

  ngOnInit() {
  }

  onSelected(variantIndex: number) {
    this.variants
      .filter(variant => variant.state === VariantState.SELECTED)
      .forEach(variant => variant.state = VariantState.ENABLED);
    this.variants[variantIndex].state = VariantState.SELECTED;
  }

}
