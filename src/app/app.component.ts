import { Component } from '@angular/core';
import { FeatureService } from './feature/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  featureGroupDefinitions$ = this.featureService.selectFeatureGroupDefinitions$();

  constructor(
    private featureService: FeatureService
  ) { }
}
