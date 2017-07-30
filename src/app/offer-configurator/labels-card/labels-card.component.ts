import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'div.card[appLabelsCard]',
  host: {'class': 'app-labels-card'}
})
export class LabelsCardComponentStyler { }

@Component({
  selector: 'div.card[appLabelsCard]',
  templateUrl: './labels-card.component.html',
  styleUrls: ['./labels-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelsCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
