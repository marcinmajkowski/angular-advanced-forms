export interface LabelColumn {
  kind: 'label';
  gridColumnCount?: number;
  fields: LabelColumnField[];
}

export interface LabelColumnField {
  type: 'SECTION_HEADER' | 'LABEL';
  text: string;
  description?: string;
}
