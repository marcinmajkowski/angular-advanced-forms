export type LabelColumnField = SectionHeaderLabelColumnField | LabelLabelColumnField;

export interface SectionHeaderLabelColumnField {
  kind: 'sectionHeader';
  text: string;
}

export interface LabelLabelColumnField {
  kind: 'label';
  text: string;
  description: string;
}
