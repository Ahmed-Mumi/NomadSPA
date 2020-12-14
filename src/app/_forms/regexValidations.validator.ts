import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      let hasUpper = /(?=.*?[A-Z])/.test(control.value);
      let hasLower = /(?=.*?[a-z])/.test(control.value);
      let hasDigit = /(?=.*?[0-9])/.test(control.value);
      let hasSpecialCharacter = /(?=.*?[#?!@$%^&*:-])/.test(control.value);
      if (control?.value) {
        if (!hasUpper) {
          return { noUpper: true };
        }
        if (!hasLower) {
          return { noLower: true };
        }
        if (!hasDigit) {
          return { noDigit: true };
        }
        if (!hasSpecialCharacter) {
          return { noSpecialCharacter: true };
        }
        return null;
      }
    };
  }
}

export class EmailValidator {
  public static emailValidator(config: any): ValidatorFn {
    return (control: AbstractControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control?.value && !control.value.match(urlRegEx)) {
        return {
          isInvalidRgx: true,
        };
      } else {
        return null;
      }
    };
  }
}
