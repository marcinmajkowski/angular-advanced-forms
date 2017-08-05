import { VariantFieldType } from './variant-field-type.enum';

export interface FeatureDefinition {
  id: string;
  name: string;
  description?: string;
  variantFieldType: VariantFieldType;
}
