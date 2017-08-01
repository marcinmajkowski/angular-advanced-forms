import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureService } from './feature.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FeatureService,
  ]
})
export class FeatureModule { }
