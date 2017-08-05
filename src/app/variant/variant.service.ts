import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FeatureGroup } from '../feature/feature-group.model';
import 'rxjs/add/operator/pluck';
import { VariantPriceService } from './variant-price.service';
import { VariantLimitsService } from './variant-limits.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Variant } from './variant.model';

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

const initialState: State = {
  variants: sampleVariants(),
  selectedVariantId: '1',
};

@Injectable()
export class VariantService {

  private subject = new BehaviorSubject<State>(initialState);
  store = this.subject.asObservable().distinctUntilChanged();

  // FIXME update limits on initialization
  constructor(private variantPriceService: VariantPriceService,
              private variantLimitsService: VariantLimitsService) { }

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

  updateFeatureValue(variantIndex: number, featureGroupIndex: number, featureIndex: number, newValue: number) {
    const value = this.subject.value;
    const variantMutable = <Variant>JSON.parse(JSON.stringify(value.variants[variantIndex]));
    variantMutable.featureGroups[featureGroupIndex].features[featureIndex].value = newValue;
    this.variantLimitsService.calculateLimits(variantMutable);
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
