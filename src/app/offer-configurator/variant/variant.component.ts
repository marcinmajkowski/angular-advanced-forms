import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant } from './variant.model';
import { VariantState } from './variant-state.model';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  @Input() variant: Variant;

  @Output() selected = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.variant.state === VariantState.DISABLED;
  }

  get isSelected(): boolean {
    return this.variant.state === VariantState.SELECTED;
  }

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    this.selected.emit();
  }

}
