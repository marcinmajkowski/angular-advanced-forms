import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appMin]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator, OnChanges {

  @Input('appMin') min: string;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes) {
      this.createValidator();
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.min == null ? null : this.validator(control);
  }

  registerOnValidatorChange(onChange: () => void): void {
    this.onChange = onChange;
  }

  private createValidator(): void {
    this.validator = Validators.min(parseInt(this.min, 10));
  }
}
