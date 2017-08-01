import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appMax]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator, OnChanges {

  @Input('appMax') max: string;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      this.createValidator();
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.max == null ? null : this.validator(control);
  }

  registerOnValidatorChange(onChange: () => void): void {
    this.onChange = onChange;
  }

  private createValidator(): void {
    this.validator = Validators.max(parseInt(this.max, 10));
  }
}
