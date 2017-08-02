import { Injectable } from '@angular/core';
import { FeatureGroupDefinition } from './feature-group-definition.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { VariantFieldType } from './variant-field-type.enum';

const featureGroupDefinitions: FeatureGroupDefinition[] = [{
  name: 'First group',
  features: [
    {name: 'Feature one', description: 'No limits', variantFieldType: VariantFieldType.INPUT},
    {name: 'Feature two', description: '1 - 2 of feature one', variantFieldType: VariantFieldType.INPUT},
  ]
}, {
  name: 'Second group',
  features: [
    {name: 'Feature three', description: '0 - 0.5 of feature two', variantFieldType: VariantFieldType.INPUT},
    {name: 'Feature four', variantFieldType: VariantFieldType.STATIC_VALUE},
    {name: 'Feature five', variantFieldType: VariantFieldType.STATIC_VALUE},
  ]
}];

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
}
