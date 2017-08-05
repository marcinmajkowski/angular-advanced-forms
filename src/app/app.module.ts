import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { VariantModule } from './variant/variant.module';
import { OfferConfiguratorAdapterComponent } from './offer-configurator-adapter/offer-configurator-adapter.component';
import { ConfiguratorModule } from './configurator/configurator.module';

@NgModule({
  declarations: [
    AppComponent,
    OfferConfiguratorAdapterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    ConfiguratorModule,
    FeatureModule,
    VariantModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
