import { FeatureGroup } from './feature/feature-group.model';

export interface Variant {
  name: string;
  isDisabled: boolean;
  featureGroups: FeatureGroup[];
  price: number;
}
