import { Injectable } from '@angular/core';
import { Variant } from './variant/variant.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { FeatureGroup } from '../feature/feature-group.model';
import { Feature } from '../feature/feature.model';

@Injectable()
export class VariantPriceService {

  // TODO simulate error with offline flag
  // TODO loading indicator
  constructor() { }

  calculatePrice$(variant: Variant): Observable<Variant> {
    if (!this.isValidVariant(variant)) {
      return Observable.of({...variant, price: null});
    } else {
      return Observable.of({...variant, price: priceForVariant(variant)}).delay(500);
    }
  }

  private isValidVariant(variant: Variant): boolean {
    return variant.featureGroups.every(featureGroup => this.isValidFeatureGroup(featureGroup));
  }

  private isValidFeatureGroup(featureGroup: FeatureGroup): boolean {
    return featureGroup.features.every(feature => this.isValidFeature(feature));
  }

  private isValidFeature(feature: Feature) {
    if (feature.max != null && feature.value > feature.max) {
      return false;
    } else if (feature.min != null && feature.value < feature.min) {
      return false;
    } else {
      return true;
    }
  }
}

function priceForVariant(variant: Variant): number {
  return variant.featureGroups
    .reduce((price, featureGroup) => price + priceForFeatureGroup(featureGroup), 0);
}

function priceForFeatureGroup(featureGroup: FeatureGroup): number {
  return featureGroup.features
    .reduce((price, feature) => price + feature.value, 0);
}
