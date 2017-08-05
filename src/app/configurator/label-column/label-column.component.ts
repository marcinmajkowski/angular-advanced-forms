import { Component, Input } from '@angular/core';
import { LabelColumn } from './label-column.model';

@Component({
  selector: 'app-label-column',
  templateUrl: './label-column.component.html',
  styleUrls: ['./label-column.component.scss'],
})
export class LabelColumnComponent {

  @Input()
  column: LabelColumn;
}
