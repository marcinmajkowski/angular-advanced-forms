import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant } from './variant.model';
import { Feature } from './feature/feature.model';
import { FeatureGroup } from './feature/feature-group.model';

// FIXME probably need to trigger validators manually on min/max change
@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  @Input() variant: Variant;

  @Input() isSelected: boolean;

  @Output() selected = new EventEmitter<void>();

  @Output() featureChange = new EventEmitter<void>();

  @Output() variantUpdate = new EventEmitter<Variant>();

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

  // TODO refactor
  onFeatureValueNgModelChange(featureGroupIndex: number, featureIndex: number, newValue: number) {
    const updatedFeature: Feature = {
      ...this.variant.featureGroups[featureGroupIndex].features[featureIndex],
      value: newValue
    };
    const updatedFeatures: Feature[] = Object.assign([], this.variant.featureGroups[featureGroupIndex].features, {[featureIndex]: updatedFeature});
    const updatedFeatureGroup: FeatureGroup = {
      ...this.variant.featureGroups[featureGroupIndex],
      features: updatedFeatures
    };
    const updatedFeatureGroups: FeatureGroup[] = Object.assign([], this.variant.featureGroups, {[featureGroupIndex]: updatedFeatureGroup});
    this.variantUpdate.emit({
      ...this.variant,
      featureGroups: updatedFeatureGroups
    });
  }
}
