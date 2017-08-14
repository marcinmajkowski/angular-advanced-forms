import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from './column.interface';
import { FormColumn } from './form-column/form-column.model';
import { FormColumnField } from './form-column/form-column-field.model';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
})
export class ConfiguratorComponent {

  @Input() columns: Column[];

  @Output() columnChoose = new EventEmitter<Column>();

  @Output() columnFieldEditingComplete = new EventEmitter<{ column: FormColumn, field: FormColumnField }>();

  @Output() columnFieldValueChange = new EventEmitter<{ column: FormColumn, field: FormColumnField }>();

  onFieldValueChange(column: FormColumn, field: FormColumnField) {
    this.columnFieldValueChange.emit({
      column: column,
      field: field
    });
  }

  // TODO common interface for various Column fields
  onFieldEditingComplete(column: FormColumn, field: FormColumnField) {
    this.columnFieldEditingComplete.emit({
      column: column,
      field: field
    });
  }

  onChoose(column: Column) {
    this.columnChoose.emit(column);
  }

  trackByFn(index, item) {
    return index;
  }
}
