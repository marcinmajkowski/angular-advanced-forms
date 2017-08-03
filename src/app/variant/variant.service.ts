import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Variant } from '../offer-configurator/variant/variant.model';
import { Observable } from 'rxjs/Observable';
import { FeatureGroup } from '../feature/feature-group.model';
import 'rxjs/add/operator/pluck';
import { VariantPriceService } from './variant-price.service';
import { VariantLimitsService } from './variant-limits.service';

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

function sampleVariants(): Variant[] {
  return [{
    id: '1',
    name: 'First',
    isDisabled: false,
    featureGroups: sampleFeatureGroups(),
    price: null,
  }, {
    id: '2',
    name: 'Second',
    isDisabled: false,
    featureGroups: sampleFeatureGroups(),
    price: null,
  }, {
    id: '3',
    name: 'Third',
    isDisabled: false,
    featureGroups: sampleFeatureGroups(),
    price: null,
  }];
}

interface State {
  variants: Variant[];
  selectedVariantId: string;
}

const state: State = {
  variants: sampleVariants(),
  selectedVariantId: '1',
};

@Injectable()
export class VariantService {

  private subject = new BehaviorSubject<State>(state);
  store = this.subject.asObservable().distinctUntilChanged();

  constructor(private variantPriceService: VariantPriceService,
              private variantLimitsService: VariantLimitsService) { }

  select$<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  updateSelectedVariantId(variantId: string) {
    const value = this.subject.value;
    this.subject.next({...value, selectedVariantId: variantId});
  }

  updateVariant(variant: Variant) {

  }
}
