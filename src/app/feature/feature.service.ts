import { Injectable } from '@angular/core';
import { FeatureGroupDefinition } from './feature-group-definition.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { VariantFieldType } from './variant-field-type.enum';

const featureGroupDefinitions: FeatureGroupDefinition[] = [{
  name: 'First group',
  features: [
    {id: '1', name: 'Feature one', description: 'No limits', variantFieldType: VariantFieldType.INPUT},
    {id: '2', name: 'Feature two', description: '1 - 2 of feature one', variantFieldType: VariantFieldType.INPUT},
  ]
}, {
  name: 'Second group',
  features: [
    {id: '3', name: 'Feature three', description: '0 - 0.5 of feature two', variantFieldType: VariantFieldType.INPUT},
    {id: '4', name: 'Feature four', variantFieldType: VariantFieldType.STATIC_VALUE},
    {id: '5', name: 'Feature five', variantFieldType: VariantFieldType.STATIC_VALUE},
  ]
}];

export interface FeatureConstraints {
  min?: number;
  max?: number;
  required: boolean;
}

@Injectable()
export class FeatureService {

  private subject = new BehaviorSubject<FeatureGroupDefinition[]>(featureGroupDefinitions);
  store = this.subject.asObservable().distinctUntilChanged();

  selectFeatureGroupDefinitions$(): Observable<FeatureGroupDefinition[]> {
    return this.store;
  }

  addFeatureGroupDefinition(featureGroupDefinition: FeatureGroupDefinition): void {
    const value = this.subject.value;
    this.subject.next([...value, featureGroupDefinition]);
  }

  constraints(featureIdToValue: {[featureId: string]: any}): {[featureId: string]: FeatureConstraints} {
    const featureIdToContraints = {};

    featureIdToContraints['1'] = {
      min: null,
      max: null,
      required: true
    };

    // Feature two value should be 1 - 2 of feature one
    const featureOneValue = featureIdToValue['1'];
    featureIdToContraints['2'] = {
      min: featureOneValue ? featureOneValue : null,
      max: featureOneValue ? featureOneValue * 2 : null,
      required: true
    };

    // Feature three value should be 0 - 0.5 of feature two
    const featureTwoValue = featureIdToValue['2'];
    featureIdToContraints['3'] = {
      min: featureTwoValue ? 0 : null,
      max: featureTwoValue ? featureTwoValue * 0.5 : null,
      required: true
    };

    featureIdToContraints['4'] = {
      min: null,
      max: null,
      required: true
    };

    featureIdToContraints['5'] = {
      min: null,
      max: null,
      required: true
    };

    return featureIdToContraints;
  }
}
