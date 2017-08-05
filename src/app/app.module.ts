import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { OfferConfiguratorComponent } from './offer-configurator/offer-configurator.component';
import { VariantComponent } from './offer-configurator/variant/variant.component';
import { VariantLabelsComponent } from './offer-configurator/variant-labels/variant-labels.component';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { VariantModule } from './variant/variant.module';
import { OfferConfiguratorAdapterComponent } from './offer-configurator-adapter/offer-configurator-adapter.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferConfiguratorComponent,
    VariantComponent,
    VariantLabelsComponent,
    OfferConfiguratorAdapterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    FeatureModule,
    VariantModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
