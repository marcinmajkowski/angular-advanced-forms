import { Component } from '@angular/core';
import { Variant } from './variant/variant.model';
import 'rxjs/add/operator/finally';
import { FeatureValueChangeEvent } from './variant/feature-value-change-event.model';
import { VariantService } from '../variant/variant.service';
import { FeatureService } from '../feature/feature.service';

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
})
export class OfferConfiguratorComponent {

  featureGroupDefinitions$ = this.featureService.selectFeatureGroupDefinitions$();

  variants$ = this.variantService.select$('variants');

  selectedVariantId$ = this.variantService.select$('selectedVariantId');

  constructor(private featureService: FeatureService,
              private variantService: VariantService) { }

  onSelected(variant: Variant) {
    this.variantService.updateSelectedVariantId(variant.id);
  }

  onFeatureChange(variant: Variant) {
    this.variantService.calculateVariant(variant.id);
  }

  onFeatureValueChange(variantIndex: number, event: FeatureValueChangeEvent) {
    const featureGroupIndex = event.featureGroupIndex;
    const featureIndex = event.featureIndex;
    this.variantService.updateFeatureValue(variantIndex, featureGroupIndex, featureIndex, event.newValue);
  }

  trackByFn(index, item) {
    return index;
  }
}
