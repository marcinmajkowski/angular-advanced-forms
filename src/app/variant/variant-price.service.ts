import { Injectable } from '@angular/core';
import { Variant } from './variant.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class VariantPriceService {

  calculatePrice$(variant: Variant): Observable<number> {
    return Observable.of(this.priceForVariant(variant)).delay(500);
  }

  private priceForVariant(variant: Variant): number {
    return variant.features
      .reduce((price, feature) => price + feature.value, 0);
  }
}
