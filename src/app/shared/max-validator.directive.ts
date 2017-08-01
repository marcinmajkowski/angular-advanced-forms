import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appMax]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator, OnChanges {

  @Input('appMax') max: number;

  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['max'];
    if (change) {
      this.valFn = Validators.max(change.currentValue);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.valFn(control);
  }
}
