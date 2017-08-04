export type FormColumnFieldType
  = 'STATIC_TEXT'
  | 'NUMBER_INPUT'
  | 'SPACER';

export interface FormColumnField {
  id: string;
  type: FormColumnFieldType;
}

export interface StaticTextFormColumnField extends FormColumnField {
  text?: string;
}

export interface NumberInputFormColumnField extends FormColumnField {
  value: number;
  min?: number;
  max?: number;
  required?: boolean;
}
