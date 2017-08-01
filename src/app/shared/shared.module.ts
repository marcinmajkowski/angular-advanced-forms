import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MinValidatorDirective, MaxValidatorDirective],
  exports: [MinValidatorDirective, MaxValidatorDirective],
})
export class SharedModule { }
