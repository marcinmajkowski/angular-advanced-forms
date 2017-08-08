import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import { VariantPriceService } from './variant-price.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Variant } from './variant.model';
import { VariantFeature } from './variant-feature.model';

function sampleVariantFeatures(): VariantFeature[] {
  return [{
    definitionId: '1',
    value: 100,
  }, {
    definitionId: '2',
    value: 200,
  }, {
    definitionId: '3',
    value: 300,
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

  constructor(private variantPriceService: VariantPriceService) {
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
    const variantIndex = state.variants.findIndex(variant => variant.id === variantId);
    const variant = state.variants[variantIndex];
    const featureIndex = variant.features.findIndex(feature => feature.definitionId === featureDefinitionId);
    const feature = variant.features[featureIndex];

    const newFeature = <VariantFeature>{...feature, value: newValue};
    const newVariant = <Variant>{
      ...variant,
      features: Object.assign([], variant.features, {[featureIndex]: newFeature}),
      price: null
    };
    this.subject.next({
      ...state,
      variants: Object.assign([...state.variants], {[variantIndex]: newVariant})
    });
  }

  public calculateVariant(variantId: string) {
    // TODO check constraints
    const variant = this.subject.value.variants.find(variant => variant.id === variantId);
    this.updateVariantIsDisabled(variantId, true);
    this.variantPriceService.calculatePrice$(variant)
      .do(price => this.updateVariantPrice(variantId, price))
      .finally(() => this.updateVariantIsDisabled(variantId, false))
      .subscribe();
  }

  private updateVariantPrice(variantId: string, newPrice: number) {
    const state = this.subject.value;
    const variantIndex = state.variants.findIndex(variant => variant.id === variantId);
    const variant = state.variants[variantIndex];

    const newVariant = <Variant>{
      ...variant,
      price: newPrice
    };
    this.subject.next({
      ...state,
      variants: Object.assign([...state.variants], {[variantIndex]: newVariant})
    });
  }

  private updateVariantIsDisabled(variantId: string, isDisabled: boolean) {
    const state = this.subject.value;
    const variantIndex = state.variants.findIndex(variant => variant.id === variantId);
    const variant = state.variants[variantIndex];
    const newVariant = {...variant, isDisabled: isDisabled};
    this.subject.next({
      ...state,
      variants: Object.assign([...state.variants], {[variantIndex]: newVariant})
    });
  }
}
