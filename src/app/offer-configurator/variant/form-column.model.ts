import { FormColumnField } from './form-column-field.model';

export interface FormColumn {
  kind: 'form';
  gridColumnCount?: number;
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  isSelected: boolean;
  isDisabled: boolean;
  fields: FormColumnField[];
}
