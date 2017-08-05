import { FeatureGroup } from '../feature/feature-group.model';

export interface Variant {
  id: string;
  name: string;
  isDisabled: boolean;
  featureGroups: FeatureGroup[];
  price: number;
}
