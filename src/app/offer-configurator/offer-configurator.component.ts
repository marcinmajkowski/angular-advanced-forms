import { Component } from '@angular/core';
import { Variant } from './variant/variant.model';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/combineLatest';
import { VariantService } from '../variant/variant.service';
import { FeatureService } from '../feature/feature.service';
import { Observable } from 'rxjs/Observable';
import { FormColumn } from './variant/form-column.model';
import { FeatureGroupDefinition } from '../feature/feature-group-definition.model';
import { FeatureGroup } from '../feature/feature-group.model';
import {
  FormColumnField,
  NumberInputFormColumnField,
  StaticTextFormColumnField
} from './variant/form-column-field.model';
import { FeatureDefinition } from '../feature/feature-definition.model';
import { Feature } from '../feature/feature.model';
import { VariantFieldType } from '../feature/variant-field-type.enum';
import { LabelColumn } from './variant-labels/label-column.model';
import { Column } from './variant/column.interface';

// TODO move mapping code to facade

function columnFromVariant(variant: Variant, selectedVariantId: string, featureGroupDefinitions: FeatureGroupDefinition[]): FormColumn {
  return {
    kind: 'form',
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

function variantIdFromColumn(formColumn: FormColumn) {
  return formColumn.id;
}

// TODO refactor so this component will not know about features or variants
@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
})
export class OfferConfiguratorComponent {

  featureGroupDefinitions$: Observable<FeatureGroupDefinition[]> = this.featureService.selectFeatureGroupDefinitions$();

  variants$: Observable<Variant[]> = this.variantService.select$('variants');

  selectedVariantId$: Observable<string> = this.variantService.select$('selectedVariantId');

  formColumns$: Observable<FormColumn[]> = this.variants$
    .combineLatest(
      this.selectedVariantId$,
      this.featureGroupDefinitions$,
      (variants, selectedVariantId, featureGroupDefinitions) => variants.map(variant => columnFromVariant(
        variant,
        selectedVariantId,
        featureGroupDefinitions
      ))
    );

  // TODO LabelColumn and FormColumn common base class
  labelColumn$: Observable<LabelColumn> = this.featureGroupDefinitions$
    .map(featureGroupDefinitions => ({
      kind: 'label',
      fields: featureGroupDefinitions.reduce((fields, featureGroupDefinition) => {
        fields.push({
          type: 'SECTION_HEADER',
          text: featureGroupDefinition.name
        });
        return fields.concat(featureGroupDefinition.features.map(feature => ({
          type: 'LABEL',
          text: feature.name,
          description: feature.description
        })));
      }, [])
    }));

  column$: Observable<Column[]> = Observable.combineLatest(
    this.labelColumn$,
    this.formColumns$,
    (labelColumn, formColumns) => [labelColumn, ...formColumns]
  );

  constructor(private featureService: FeatureService,
              private variantService: VariantService) { }

  onSelected(column: FormColumn) {
    this.variantService.updateSelectedVariantId(variantIdFromColumn(column));
  }

  onFieldChange(column: FormColumn) {
    this.variantService.calculateVariant(variantIdFromColumn(column));
  }

  // TODO refactor
  onFieldValueChange(column: FormColumn, event: {fieldId: string, value: any}) {
    Observable.of(true)
      .withLatestFrom(this.variants$, (_, variants) => {
        const variantIndex = variants.findIndex(variant => variant.id === column.id);
        const featureGroupIndex = variants[variantIndex].featureGroups
          .findIndex(featureGroup => !!featureGroup.features
            .find(feature => feature.name === event.fieldId));
        const featureIndex = variants[variantIndex].featureGroups[featureGroupIndex].features
          .findIndex(feature => feature.name === event.fieldId);
        this.variantService.updateFeatureValue(variantIndex, featureGroupIndex, featureIndex, event.value);
      }).subscribe();
  }

  trackByFn(index, item) {
    return index;
  }
}
