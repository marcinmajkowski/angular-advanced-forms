import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appMin]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})
export class MinDirective implements Validator, OnChanges {

  @Input('appMin') min: number;

  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['min'];
    if (change) {
      this.valFn = Validators.min(change.currentValue);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.valFn(control);
  }
}
