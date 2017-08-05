export interface LabelColumn {
  kind: 'label';
  fields: LabelColumnField[];
}

export interface LabelColumnField {
  type: 'SECTION_HEADER' | 'LABEL';
  text: string;
  description?: string;
}
