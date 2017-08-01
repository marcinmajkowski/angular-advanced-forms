import { Injectable } from '@angular/core';
import { Variant } from './variant/variant.model';
import { Feature } from '../feature/feature.model';

@Injectable()
export class VariantLimitsService {

  calculateLimits(variant: Variant): void {
    this.clearLimits(variant);

    const featureOne = this.findFeatureByName(variant, 'Feature one');
    const featureTwo = this.findFeatureByName(variant, 'Feature two');
    const featureThree = this.findFeatureByName(variant, 'Feature three');

    featureTwo.min = featureOne.value * 1;
    featureTwo.max = featureOne.value * 2;

    featureThree.min = featureTwo.value * 0;
    featureThree.max = featureTwo.value * 0.5;
  }

  private clearLimits(variant: Variant): void {
    variant.featureGroups.forEach(featureGroup => featureGroup.features.forEach(feature => {
      feature.min = null;
      feature.max = null;
    }));
  }

  private findFeatureByName(variant: Variant, name: string): Feature {
    for (const featureGroup of variant.featureGroups) {
      const foundFeature = featureGroup.features.find(feature => feature.name === name);
      if (foundFeature) {
        return foundFeature;
      }
    }
    return null;
  }
}
