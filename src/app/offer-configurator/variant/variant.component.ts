import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant } from './variant.model';
import { FeatureValueChangeEvent } from './feature-value-change-event.model';
import { Feature } from '../../feature/feature.model';
import { FeatureDefinition } from '../../feature/feature-definition.model';
import { FeatureGroupDefinition } from '../../feature/feature-group-definition.model';
import { VariantFieldType } from '../../feature/variant-field-type.enum';

// TODO ChangeDetectionStrategy.ON_PUSH breaks initial validation
@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class VariantComponent implements OnInit {

  @Input() variant: Variant;

  @Input() isSelected: boolean;

  @Input() featureGroupDefinitions: boolean;

  @Output() selected = new EventEmitter<void>();

  @Output() featureChange = new EventEmitter<void>();

  @Output() featureValueChange = new EventEmitter<FeatureValueChangeEvent>();

  get isDisabled(): boolean {
    return this.variant.isDisabled;
  }

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    this.selected.emit();
  }

  onChange() {
    this.featureChange.emit();
  }

  onFeatureValueNgModelChange(featureGroupIndex: number, featureIndex: number, newValue: number) {
    this.featureValueChange.emit({
      featureGroupIndex: featureGroupIndex,
      featureIndex: featureIndex,
      newValue: newValue
    });
  }

  // TODO use dictionary or change model
  featureForDefinition(featureGroupDefinition: FeatureGroupDefinition, featureDefinition: FeatureDefinition): Feature {
    return this.variant.featureGroups
      .find(featureGroup => featureGroup.name === featureGroupDefinition.name)
      .features
      .find(feature => feature.name === featureDefinition.name);
  }

  isInputFieldType(featureDefitnion: FeatureDefinition) {
    return featureDefitnion.variantFieldType === VariantFieldType.INPUT;
  }

  isStaticValueFieldType(featureDefitnion: FeatureDefinition) {
    return featureDefitnion.variantFieldType === VariantFieldType.STATIC_VALUE;
  }

  trackByFn(index, item) {
    return index;
  }
}
