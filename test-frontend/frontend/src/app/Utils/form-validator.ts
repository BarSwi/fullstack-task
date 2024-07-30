import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameNotEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === undefined) {
            return null;
        }

        const isWhitespace = typeof control.value === 'string' && control.value.trim().length === 0;
        const hasLength = typeof control.value === 'string' && control.value.length > 0;
        return isWhitespace && hasLength ? {nameWhitespace: true} : null;
    };
}

export function checkIfNumber(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === undefined || control.value === '') {
            return null;
        }

        const valid = !isNaN(control.value);
        return valid ? null : {notNumber: true};
    }
}

export function checkMinimumValue(minValue: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === undefined || control.value === '' || isNaN(control.value)) {
            return null;
        }
        return control.value >= minValue ? null : {'minValueError': true} ;
    }
}


export function checkMaximumValue(maxValue: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === null || control.value === undefined || control.value === '' || isNaN(control.value)) {
            return null;
        }
        return control.value < maxValue ? null : {'maxValueError': true} ;
    }
}

function createFieldComparisonValidator(
    field1: string,
    field2: string,
    errorKey: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstFieldControl : any = control.get(field1);
      const secondFieldControl : any = control.get(field2);

      if(!firstFieldControl || !secondFieldControl) return null;

      const value1 = firstFieldControl.value;
      const value2 = secondFieldControl.value;
      if (value1 === null || value1 === undefined || value1 === '' ||
          value2 === null || value2 === undefined || value2 === '') {
        return null;
      }
  
      const valid = value1 < value2;
      const errorsCheck = (!firstFieldControl.errors || hasError(firstFieldControl, errorKey)) && (!secondFieldControl.errors || hasError(secondFieldControl, errorKey));

      if (!valid && errorsCheck) {
        control.get(field1)?.setErrors({ [errorKey]: true });
        control.get(field2)?.setErrors({ [errorKey]: true });
      } else {

        compareFieldsHelper(control.get(field1), errorKey);
        compareFieldsHelper(control.get(field2), errorKey);
      }
  
      return null;
    };
  }

export function compareFieldsTiTm(Ti: string, Tm: string): ValidatorFn {
    return createFieldComparisonValidator(
      Ti,
      Tm,
      'TmLowerThanTiError'
    );
  }
  
  export function compareFieldsIP(I: string, P: string): ValidatorFn {
    return createFieldComparisonValidator(
      I,
      P,
      'PLowerThanI'
    );
  }

function compareFieldsHelper(control: AbstractControl | null, errorKey: string): void {
    if (control) {
        const errors = control.errors ? { ...control.errors } : {};
        delete errors[errorKey];
        control.setErrors(Object.keys(errors).length ? errors : null);
    }
}

function hasError(control: AbstractControl, errorKey: string): boolean {
    const errors = control.errors;
    
    if (errors && Object.keys(errors).length > 0) {
      return Object.keys(errors).includes(errorKey);
    }
    return false;
  }
