import { VariantFeature } from './variant-feature.model';

export interface Variant {
  id: string;
  name: string;
  isDisabled: boolean;
  features: VariantFeature[];
  price: number;
}
