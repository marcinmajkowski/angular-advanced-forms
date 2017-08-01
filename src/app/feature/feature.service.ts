import { Injectable } from '@angular/core';
import { FeatureGroupDefinition } from './feature-group-definition.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

const featureGroupDefinitions: FeatureGroupDefinition[] = [{
  name: 'First group',
  features: [
    {name: 'Feature one', description: 'No limits'},
    {name: 'Feature two', description: '1 - 2 of feature one'},
  ]
}, {
  name: 'Second group',
  features: [
    {name: 'Feature three', description: '0 - 0.5 of feature two'},
    {name: 'Feature four'},
    {name: 'Feature five'},
  ]
}];

@Injectable()
export class FeatureService {

  private subject = new BehaviorSubject<FeatureGroupDefinition[]>(featureGroupDefinitions);
  store = this.subject.asObservable().distinctUntilChanged();

  selectFeatureGroupDefinitions$(): Observable<FeatureGroupDefinition[]> {
    return this.store;
  }
}
