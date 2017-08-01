import { Component, Input } from '@angular/core';
import { FeatureGroupDefinition } from '../../feature/feature-group-definition.model';

@Component({
  selector: 'app-variant-labels',
  templateUrl: './variant-labels.component.html',
  styleUrls: ['./variant-labels.component.scss'],
})
export class VariantLabelsComponent {

  @Input()
  featureGroupDefinitions: FeatureGroupDefinition[];
}
