import { FeatureConstraints } from '../feature/feature-constraints.model';

export interface VariantFeature {
  definitionId: string;
  constraints?: FeatureConstraints;
  value: number;
}
