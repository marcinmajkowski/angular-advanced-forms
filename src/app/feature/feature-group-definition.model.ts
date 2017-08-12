import { FeatureDefinition } from './feature-definition.model';

export interface FeatureGroupDefinition {
  name: string;
  description?: string;
  hasGroupCheck: boolean;
  features: FeatureDefinition[];
}
