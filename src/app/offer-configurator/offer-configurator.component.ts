import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from './variant/column.interface';
import { FormColumn } from './variant/form-column.model';
import { FormColumnField } from './variant/form-column-field.model';

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss'],
})
export class OfferConfiguratorComponent {

  @Input() columns: Column[];

  @Output() columnSelect = new EventEmitter<Column>();

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

  onSelect(column: Column) {
    this.columnSelect.emit(column);
  }

  trackByFn(index, item) {
    return index;
  }
}
