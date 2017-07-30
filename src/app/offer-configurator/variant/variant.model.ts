import { VariantState } from './variant-state.model';
import { FeatureGroup } from './feature/feature-group.model';

export interface Variant {
  name: string;
  state: VariantState;
  featureGroups: FeatureGroup[];
  price: number;
}
