import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureService } from './feature.service';
import { FeatureConstraintsService } from './feature-constraints.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FeatureService,
    FeatureConstraintsService,
  ]
})
export class FeatureModule { }
