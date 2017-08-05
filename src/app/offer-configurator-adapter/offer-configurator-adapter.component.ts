import { Component } from '@angular/core';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/combineLatest';
import { VariantService } from '../variant/variant.service';
import { FeatureService } from '../feature/feature.service';
import { Observable } from 'rxjs/Observable';
import { FeatureGroupDefinition } from '../feature/feature-group-definition.model';
import { FeatureGroup } from '../feature/feature-group.model';
import { FeatureDefinition } from '../feature/feature-definition.model';
import { Feature } from '../feature/feature.model';
import { VariantFieldType } from '../feature/variant-field-type.enum';
import { Variant } from '../variant/variant.model';
import { FormColumn } from '../configurator/form-column/form-column.model';
import {
  FormColumnField, NumberInputFormColumnField, SpacerFormColumnField,
  StaticTextFormColumnField
} from '../configurator/form-column/form-column-field.model';
import { Column } from '../configurator/column.interface';
import {
  LabelLabelColumnField,
  SectionHeaderLabelColumnField
} from '../configurator/label-column/label-column-field.model';
import { LabelColumn } from '../configurator/label-column/label-column.model';

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
    fields.push(<SpacerFormColumnField>{kind: 'spacer', id: null});
    featureGroupDefinition.features.forEach(featureDefinition => {
      const feature = featureForDefinition(featureGroups, featureGroupDefinition, featureDefinition);
      switch (featureDefinition.variantFieldType) {
        case VariantFieldType.STATIC_VALUE:
          fields.push(<StaticTextFormColumnField>{
            kind: 'staticText',
            id: feature.name,
            text: feature.value ? feature.value.toString() : ''
          });
          break;
        case VariantFieldType.INPUT:
          fields.push(<NumberInputFormColumnField>{
            kind: 'numberInput',
            id: feature.name,
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
@Component({
  selector: 'app-offer-configurator-adapter',
  templateUrl: './offer-configurator-adapter.component.html'
})
export class OfferConfiguratorAdapterComponent {

  featureGroupDefinitions$: Observable<FeatureGroupDefinition[]> = this.featureService.selectFeatureGroupDefinitions$();

  variants$: Observable<Variant[]> = this.variantService.variants$;

  selectedVariantId$: Observable<string> = this.variantService.selectedVariant$.map(variant => variant.id);

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
    .map(featureGroupDefinitions => (<LabelColumn>{
      kind: 'label',
      gridColumnCount: 4,
      fields: featureGroupDefinitions.reduce((fields, featureGroupDefinition) => {
        fields.push(<SectionHeaderLabelColumnField>{
          kind: 'sectionHeader',
          text: featureGroupDefinition.name
        });
        return fields.concat(featureGroupDefinition.features.map(feature => (<LabelLabelColumnField>{
          kind: 'label',
          text: feature.name,
          description: feature.description
        })));
      }, [])
    }));

  columns$: Observable<Column[]> = Observable.combineLatest(
    this.labelColumn$,
    this.formColumns$,
    (labelColumn, formColumns) => [labelColumn, ...formColumns]
  );

  constructor(private featureService: FeatureService,
              private variantService: VariantService) { }

  onColumnSelect(column: Column) {
    if (column.kind === 'form') {
      this.variantService.updateSelectedVariantId(variantIdFromColumn(column));
    }
  }

  onColumnFieldEditingComplete(event: { column: FormColumn, field: FormColumnField }) {
    this.variantService.calculateVariant(variantIdFromColumn(event.column));
  }

  onColumnFieldValueChange(event: { column: FormColumn, field: FormColumnField }) {
    if (event.field.kind === 'numberInput') {
      this.onFieldValueChange(event.column, {fieldId: event.field.id, value: event.field.value});
    }
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
}
