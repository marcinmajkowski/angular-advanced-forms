import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
