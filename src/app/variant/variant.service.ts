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
  store = this.subject.asObservable().distinctUntilChanged();

  // FIXME update limits on initialization
  constructor(private variantPriceService: VariantPriceService) { }

  get variants$(): Observable<Variant[]> {
    return this.store.pluck('variants');
  }

  get selectedVariant$(): Observable<Variant> {
    return this.store.map(state => state.variants.find(variant => variant.id === state.selectedVariantId));
  }

  // TODO will be async
  updateSelectedVariantId(variantId: string) {
    const value = this.subject.value;
    this.subject.next({...value, selectedVariantId: variantId});
  }

  updateFeatureValue(variantId: string, featureDefinitionId: string, newValue: number) {
    const value = this.subject.value;
    const variantIndex = value.variants.findIndex(variant => variant.id === variantId);
    const variantMutable = <Variant>JSON.parse(JSON.stringify(value.variants[variantIndex]));
    variantMutable.features.find(feature => feature.definitionId === featureDefinitionId).value = newValue;
    this.subject.next({
      ...value,
      variants: Object.assign([], value.variants, {[variantIndex]: variantMutable})
    });
  }

  calculateVariant(variantId: string) {
    const variantToCalculate = this.subject.value.variants.find(variant => variant.id === variantId);
    this.setDisabled(variantId, true);
    this.variantPriceService.calculatePrice$(variantToCalculate)
      .do(variant => this.saveVariant(variant))
      .finally(() => this.setDisabled(variantId, false))
      .subscribe();
  }

  private setDisabled(variantId: string, isDisabled: boolean) {
    const value = this.subject.value;
    const variantIndex = value.variants.findIndex(v => v.id === variantId);
    const variant = value.variants[variantIndex];
    const updatedVariant = {...variant, isDisabled: isDisabled};
    this.subject.next({
      ...value,
      variants: Object.assign([], value.variants, {[variantIndex]: updatedVariant})
    });
  }

  private saveVariant(variant: Variant) {
    const value = this.subject.value;
    const variantIndex = value.variants.findIndex(v => v.id === variant.id);
    this.subject.next({
      ...value,
      variants: Object.assign([], value.variants, {[variantIndex]: variant})
    });
  }
}
