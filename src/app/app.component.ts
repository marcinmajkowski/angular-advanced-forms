import { Component } from '@angular/core';
import { FeatureService } from './feature/feature.service';
import { VariantService } from './variant/variant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  featureGroupDefinitions$ = this.featureService.selectFeatureGroupDefinitions$();

  variants$ = this.variantService.selectVariants$();

  constructor(
    private featureService: FeatureService,
    private variantService: VariantService,
  ) { }
}
