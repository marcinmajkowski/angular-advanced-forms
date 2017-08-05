import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormColumn } from './form-column.model';
import { FormColumnField } from './form-column-field.model';

// TODO ChangeDetectionStrategy.ON_PUSH breaks initial validation
@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class VariantComponent {

  @Input() column: FormColumn;

  @Output() selected = new EventEmitter<void>();

  @Output() fieldChange = new EventEmitter<string>();

  @Output() fieldValueChange = new EventEmitter<{fieldId: string, value: any}>();

  onSelect() {
    this.selected.emit();
  }

  onChange(fieldId: string) {
    this.fieldChange.emit(fieldId);
  }

  onFieldValueNgModelChange(fieldId: string, value: any) {
    this.fieldValueChange.emit({
      fieldId: fieldId,
      value: value
    });
  }

  trackByFn(index, item) {
    return index;
  }
}
