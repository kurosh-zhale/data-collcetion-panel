import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function PasswordConfirmation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password_field = control.parent?.get('password');

    return control.value !== password_field?.value
      ? { Confirmation: true }
      : null;
  };
}
