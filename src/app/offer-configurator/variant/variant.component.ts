import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Variant } from './variant.model';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit, OnChanges {

  @Input() variant: Variant;

  @Input() isSelected: boolean;

  @Output() selected = new EventEmitter<void>();

  @Output() featureBlur = new EventEmitter<void>();

  values: number[][];

  get isDisabled(): boolean {
    return this.variant.isDisabled;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.variant) {
      this.values = changes.variant.currentValue.featureGroups.map(featureGroup => featureGroup.features.map(feature => feature.value));
    }
  }

  onSelect() {
    this.selected.emit();
  }

  onBlur() {
    this.featureBlur.emit();
  }
}
