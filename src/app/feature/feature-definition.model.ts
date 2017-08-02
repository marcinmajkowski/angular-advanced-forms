import { VariantFieldType } from './variant-field-type.enum';

export interface FeatureDefinition {
  name: string;
  description?: string;
  variantFieldType: VariantFieldType;
}
