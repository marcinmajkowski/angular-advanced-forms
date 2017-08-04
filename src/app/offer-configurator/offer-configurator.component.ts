import { Component } from '@angular/core';
import { Variant } from './variant/variant.model';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/combineLatest';
import { FeatureValueChangeEvent } from './variant/feature-value-change-event.model';
import { VariantService } from '../variant/variant.service';
import { FeatureService } from '../feature/feature.service';
import { Observable } from 'rxjs/Observable';
import { FormColumn } from './variant/form-column.model';
import { FeatureGroupDefinition } from '../feature/feature-group-definition.model';
import { FeatureGroup } from '../feature/feature-group.model';
import {
  FormColumnField, NumberInputFormColumnField,
  StaticTextFormColumnField
} from './variant/form-column-field.model';
import { FeatureDefinition } from '../feature/feature-definition.model';
import { Feature } from '../feature/feature.model';
import { VariantFieldType } from '../feature/variant-field-type.enum';

function columnFromVariant(variant: Variant, selectedVariantId: string, featureGroupDefinitions: FeatureGroupDefinition[]): FormColumn {
  return {
    id: variant.id,
    title: variant.name,
    subtitle: 'variant',
    summary: variant.price ? `\$${variant.price}` : '-',
    isSelected: variant.id === selectedVariantId,
    isDisabled: variant.isDisabled,
    fields: fieldsFromFeatureGroups(variant.featureGroups, featureGroupDefinitions)
  };
}

function fieldsFromFeatureGroups(featureGroups: FeatureGroup[], featureGroupDefinitions: FeatureGroupDefinition[]): FormColumnField[] {
  const fields: FormColumnField[] = [];
  featureGroupDefinitions.forEach(featureGroupDefinition => {
    fields.push({id: null, type: 'SPACER'});
    featureGroupDefinition.features.forEach(featureDefinition => {
      const feature = featureForDefinition(featureGroups, featureGroupDefinition, featureDefinition);
      switch (featureDefinition.variantFieldType) {
        case VariantFieldType.STATIC_VALUE:
          fields.push(<StaticTextFormColumnField>{
            id: feature.name,
            type: 'STATIC_TEXT',
            text: feature.value ? feature.value.toString() : ''
          });
          break;
        case VariantFieldType.INPUT:
          fields.push(<NumberInputFormColumnField>{
            id: feature.name,
            type: 'NUMBER_INPUT',
            value: feature.value,
            min: feature.min,
            max: feature.max,
            required: true
          });
          break;
      }
    });
  });
  return fields;
}

function featureForDefinition(featureGroups: FeatureGroup[],
                              featureGroupDefinition: FeatureGroupDefinition,
                              featureDefinition: FeatureDefinition): Feature {
  return featureGroups
    .find(featureGroup => featureGroup.name === featureGroupDefinition.name)
    .features
    .find(feature => feature.name === featureDefinition.name);
}

// TODO mapping column events back to domain

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
})
export class OfferConfiguratorComponent {

  featureGroupDefinitions$: Observable<FeatureGroupDefinition[]> = this.featureService.selectFeatureGroupDefinitions$();

  variants$: Observable<Variant[]> = this.variantService.select$('variants');

  selectedVariantId$: Observable<string> = this.variantService.select$('selectedVariantId');

  column$ = this.variants$
    .combineLatest(
      this.selectedVariantId$,
      this.featureGroupDefinitions$,
      (variants, selectedVariantId, featureGroupDefinitions) => columnFromVariant(
        variants.find(variant => variant.id === selectedVariantId),
        selectedVariantId,
        featureGroupDefinitions
      )
    );

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
