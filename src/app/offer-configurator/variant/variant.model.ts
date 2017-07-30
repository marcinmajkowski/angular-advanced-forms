import { VariantState } from './variant-state.model';

export interface Variant {
  name: string;
  state: VariantState;
  price: number;
}
