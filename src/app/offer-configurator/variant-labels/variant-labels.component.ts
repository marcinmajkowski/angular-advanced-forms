import { Component, Input, OnInit } from '@angular/core';
import { FeatureGroup } from '../variant/feature/feature-group.model';

@Component({
  selector: 'app-variant-labels',
  templateUrl: './variant-labels.component.html',
  styleUrls: ['./variant-labels.component.scss'],
})
export class VariantLabelsComponent implements OnInit {

  @Input() featureGroups: FeatureGroup[];

  constructor() { }

  ngOnInit() {
  }

}
