import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Variant } from '../offer-configurator/variant/variant.model';
import { Observable } from 'rxjs/Observable';
import { FeatureGroup } from '../feature/feature-group.model';

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
}

@Injectable()
export class VariantService {

  private subject = new BehaviorSubject<Variant[]>(sampleVariants());
  store = this.subject.asObservable().distinctUntilChanged();

  selectVariants$(): Observable<Variant[]> {
    return this.store;
  }
}
