import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant } from './variant.model';
import { Feature } from './feature/feature.model';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  @Input() variant: Variant;

  @Input() isSelected: boolean;

  @Output() selected = new EventEmitter<void>();

  @Output() featureBlur = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.variant.isDisabled;
  }

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    this.selected.emit();
  }

  onBlur() {
    this.featureBlur.emit();
  }

  onFeatureValueChange(feature: Feature, newValue: number) {
    console.log(`old: ${feature.value}, new: ${newValue}`);
  }
}
