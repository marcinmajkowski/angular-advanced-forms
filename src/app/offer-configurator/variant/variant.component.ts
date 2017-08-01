import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant } from './variant.model';
import { FeatureValueChangeEvent } from './feature-value-change-event.model';

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
}
