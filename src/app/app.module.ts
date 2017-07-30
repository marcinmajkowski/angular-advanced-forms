import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { OfferConfiguratorComponent } from './offer-configurator/offer-configurator.component';
import { VariantComponent } from './offer-configurator/variant/variant.component';
import { VariantLabelsComponent } from './offer-configurator/variant-labels/variant-labels.component';
import { FeatureComponent } from './offer-configurator/variant/feature/feature.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferConfiguratorComponent,
    VariantComponent,
    VariantLabelsComponent,
    FeatureComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
