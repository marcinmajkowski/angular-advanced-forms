import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Variant } from './variant.model';
import { VariantState } from './variant-state.model';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit, OnChanges {

  @Input() variant: Variant;

  @Output() selected = new EventEmitter<void>();

  @Output() featureBlur = new EventEmitter<void>();

  values: number[][];

  get isDisabled(): boolean {
    return this.variant.state === VariantState.DISABLED;
  }

  get isSelected(): boolean {
    return this.variant.state === VariantState.SELECTED;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.values = changes.variant.currentValue.featureGroups.map(featureGroup => featureGroup.features.map(feature => feature.value));
  }

  onSelect() {
    this.selected.emit();
  }

  onBlur() {
    this.featureBlur.emit();
  }
}
