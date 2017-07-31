import { Injectable } from '@angular/core';
import { Variant } from './variant/variant.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { FeatureGroup } from './variant/feature/feature-group.model';

@Injectable()
export class VariantPriceService {

  // TODO simulate error with offline flag
  // TODO loading indicator
  constructor() { }

  calculatePrice$(variant: Variant): Observable<Variant> {
    return Observable.of(variant)
      .delay(500)
      .map(originalVariant => ({
        ...originalVariant,
        price: priceForVariant(originalVariant)
      }));
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
