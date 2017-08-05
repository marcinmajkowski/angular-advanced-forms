import { LabelColumnField } from './label-column-field.model';

export interface LabelColumn {
  kind: 'label';
  gridColumnCount?: number;
  fields: LabelColumnField[];
}
