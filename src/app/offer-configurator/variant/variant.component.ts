import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormColumn } from './form-column.model';
import { FormColumnField, NumberInputFormColumnField } from './form-column-field.model';

// TODO ChangeDetectionStrategy.ON_PUSH breaks initial validation
@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class VariantComponent {

  @Input() column: FormColumn;

  @Output() select = new EventEmitter<void>();

  @Output() fieldEditingComplete = new EventEmitter<FormColumnField>();

  @Output() fieldValueChange = new EventEmitter<FormColumnField>();

  onSelect() {
    this.select.emit();
  }

  onChange(field: FormColumnField) {
    this.fieldEditingComplete.emit(field);
  }

  onFieldValueNgModelChange(field: NumberInputFormColumnField, value: number) {
    this.fieldValueChange.emit({
      ...field,
      value: value
    });
  }

  trackByFn(index, item) {
    return index;
  }
}
