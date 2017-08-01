import { FeatureDefinition } from './feature-definition.model';

export interface FeatureGroupDefinition {
  name: string;
  description?: string;
  features: FeatureDefinition[];
}
