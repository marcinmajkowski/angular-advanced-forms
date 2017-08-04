export interface LabelColumn {
  fields: LabelColumnField[];
}

export interface LabelColumnField {
  type: 'SECTION_HEADER' | 'LABEL';
  text: string;
  description?: string;
}
