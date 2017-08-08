import { Injectable } from '@angular/core';
import { FeatureConstraints } from './feature-constraints.model';

@Injectable()
export class FeatureConstraintsService {

  constraintsForValues(featureDefinitionIdToValue: {[featureDefinitionId: string]: any}): {[featureDefinitionId: string]: FeatureConstraints} {
    const featureDefinitionIdToConstraints = {};

    featureDefinitionIdToConstraints['1'] = {
      min: null,
      max: null,
      required: true
    };

    // Feature two value should be 1 - 2 of feature one
    const featureOneValue = featureDefinitionIdToValue['1'];
    featureDefinitionIdToConstraints['2'] = {
      min: featureOneValue ? featureOneValue : null,
      max: featureOneValue ? featureOneValue * 2 : null,
      required: true
    };

    // Feature three value should be 0 - 0.5 of feature two
    const featureTwoValue = featureDefinitionIdToValue['2'];
    featureDefinitionIdToConstraints['3'] = {
      min: featureTwoValue ? 0 : null,
      max: featureTwoValue ? featureTwoValue * 0.5 : null,
      required: true
    };

    featureDefinitionIdToConstraints['4'] = {
      min: null,
      max: null,
      required: true
    };

    featureDefinitionIdToConstraints['5'] = {
      min: null,
      max: null,
      required: true
    };

    return featureDefinitionIdToConstraints;
  }
}
