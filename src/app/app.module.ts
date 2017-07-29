import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { OfferConfiguratorComponent } from './offer-configurator/offer-configurator.component';
import { VariantCardComponent } from './offer-configurator/variant-card/variant-card.component';
import { LabelsCardComponent, LabelsCardComponentStyler } from './offer-configurator/labels-card/labels-card.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferConfiguratorComponent,
    VariantCardComponent,
    LabelsCardComponent,
    LabelsCardComponentStyler,
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
