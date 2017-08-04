import { Component, Input } from '@angular/core';
import { LabelColumn } from './label-column.model';

@Component({
  selector: 'app-variant-labels',
  templateUrl: './variant-labels.component.html',
  styleUrls: ['./variant-labels.component.scss'],
})
export class VariantLabelsComponent {

  @Input()
  column: LabelColumn;
}
