import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'div.card[appVariantCard]',
  templateUrl: './variant-card.component.html',
  styleUrls: ['./variant-card.component.scss']
})
export class VariantCardComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
