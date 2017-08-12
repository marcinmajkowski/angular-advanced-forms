export type FormColumnField
  = SpacerFormColumnField
  | StaticTextFormColumnField
  | NumberInputFormColumnField
  | SectionCheckboxInputFormColumnField;

export interface SpacerFormColumnField {
  kind: 'spacer';
  id: string;
}

export interface StaticTextFormColumnField {
  kind: 'staticText';
  id: string;
  text?: string;
}

export interface NumberInputFormColumnField {
  kind: 'numberInput';
  id: string;
  value: number;
  min?: number;
  max?: number;
  required?: boolean;
}

export interface SectionCheckboxInputFormColumnField {
  kind: 'sectionCheckboxInput';
  id: string;
  value: boolean;
  required?: boolean;
}
