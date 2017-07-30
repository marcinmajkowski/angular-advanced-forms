import { Component, OnInit } from '@angular/core';
import { Variant } from './variant/variant.model';
import { VariantState } from './variant/variant-state.model';

@Component({
  selector: 'app-offer-configurator',
  templateUrl: './offer-configurator.component.html',
  styleUrls: ['./offer-configurator.component.scss']
})
export class OfferConfiguratorComponent implements OnInit {

  variants: Variant[] = [{
    name: 'First',
    state: VariantState.SELECTED,
    price: 10,
  }, {
    name: 'Second',
    state: VariantState.ENABLED,
    price: 15,
  }, {
    name: 'Third',
    state: VariantState.DISABLED,
    price: 20,
  }];

  constructor() { }

  ngOnInit() {
  }

}
