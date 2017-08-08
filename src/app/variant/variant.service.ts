import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import { VariantPriceService } from './variant-price.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Variant } from './variant.model';
import { VariantFeature } from './variant-feature.model';
import { FeatureConstraintsService } from '../feature/feature-constraints.service';

function sampleVariantFeatures(): VariantFeature[] {
  return [{
    definitionId: '1',
    value: 100,
  }, {
    definitionId: '2',
    value: 200,
  }, {
    definitionId: '3',
    value: 30,
  }, {
    definitionId: '4',
    value: 400,
  }, {
    definitionId: '5',
    value: 500,
  }];
}

function sampleVariants(): Variant[] {
  return [{
    id: '1',
    name: 'First',
    isDisabled: false,
    features: sampleVariantFeatures(),
    price: null,
  }, {
    id: '2',
    name: 'Second',
    isDisabled: false,
    features: sampleVariantFeatures(),
    price: null,
  }, {
    id: '3',
    name: 'Third',
    isDisabled: false,
    features: sampleVariantFeatures(),
    price: null,
  }];
}

// TODO add constraints to state
interface State {
  variants: Variant[];
  selectedVariantId: string;
}

const initialState: State = {
  variants: sampleVariants(),
  selectedVariantId: '1',
};

@Injectable()
export class VariantService {

  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable().distinctUntilChanged();

  constructor(private variantPriceService: VariantPriceService,
              private featureConstraintsService: FeatureConstraintsService) {
    this.subject.value.variants.forEach(variant => this.updateVariantConstraints(variant.id));
    this.subject.value.variants.forEach(variant => this.calculateVariant(variant.id));
  }

  public get variants$(): Observable<Variant[]> {
    return this.store.pluck('variants');
  }

  public get selectedVariant$(): Observable<Variant> {
    return this.store.map(state => state.variants.find(variant => variant.id === state.selectedVariantId));
  }

  public updateSelectedVariantId(variantId: string) {
    const value = this.subject.value;
    this.subject.next({...value, selectedVariantId: variantId});
  }

  public updateFeatureValue(variantId: string, featureDefinitionId: string, newValue: number) {
    const state = this.subject.value;
    const variant = state.variants.find(variant => variant.id === variantId);
    const featureIndex = variant.features.findIndex(feature => feature.definitionId === featureDefinitionId);
    const feature = variant.features[featureIndex];

    const newFeature = <VariantFeature>{...feature, value: newValue};
    const newVariant = <Variant>{
      ...variant,
      features: Object.assign([], variant.features, {[featureIndex]: newFeature}),
      price: null
    };
    this.subject.next(replaceVariant(state, newVariant));
    this.updateVariantConstraints(variantId);
  }

  public calculateVariant(variantId: string) {
    const variant = this.subject.value.variants.find(variant => variant.id === variantId);
    if (this.isValidVariant(variant)) {
      this.updateVariantIsDisabled(variantId, true);
      this.variantPriceService.calculatePrice$(variant)
        .do(price => this.updateVariantPrice(variantId, price))
        .finally(() => this.updateVariantIsDisabled(variantId, false))
        .subscribe();
    }
  }

  private isValidVariant(variant: Variant): boolean {
    return variant.features.every(feature => this.isValidFeature(feature));
  }

  private isValidFeature(feature: VariantFeature): boolean {
    const min = feature.constraints.min;
    if (min && feature.value < min) {
      return false;
    }

    const max = feature.constraints.max;
    if (max && feature.value > max) {
      return false;
    }

    const required = feature.constraints.required;
    if (required && feature.value === null) {
      return false;
    }

    return true;
  }

  private updateVariantPrice(variantId: string, newPrice: number) {
    const state = this.subject.value;
    const variant = state.variants.find(variant => variant.id === variantId);
    const newVariant = <Variant>{
      ...variant,
      price: newPrice
    };
    this.subject.next(replaceVariant(state, newVariant));
  }

  private updateVariantIsDisabled(variantId: string, isDisabled: boolean) {
    const state = this.subject.value;
    const variant = state.variants.find(variant => variant.id === variantId);
    const newVariant = {...variant, isDisabled: isDisabled};
    this.subject.next(replaceVariant(state, newVariant));
  }

  private updateVariantConstraints(variantId: string) {
    const state = this.subject.value;
    const variant = state.variants.find(variant => variant.id === variantId);
    const featureDefinitionIdToValue = variant.features.reduce((map, feature) => {
      map[feature.definitionId] = feature.value;
      return map;
    }, {});
    const featureDefinitionIdToConstraints = this.featureConstraintsService.constraintsForValues(featureDefinitionIdToValue);
    const newFeatures = variant.features
      .map(feature => ({
        ...feature,
        constraints: featureDefinitionIdToConstraints[feature.definitionId] || {min: null, max: null, required: false}
      }));
    const newVariant = {...variant, features: newFeatures};
    this.subject.next(replaceVariant(state, newVariant));
  }
}

function replaceVariant(state: State, newVariant: Variant): State {
  const variantIndex = state.variants.findIndex(variant => variant.id === newVariant.id);
  return {
    ...state,
    variants: Object.assign([...state.variants], {[variantIndex]: newVariant})
  };
}
