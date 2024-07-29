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

export function compareFields(Ti: string, Tm: string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const TiValue = control.get(Ti)?.value;
        const TmValue = control.get(Tm)?.value;
        if (TmValue === null || TmValue === undefined || TmValue === '' || TiValue === null || TiValue === undefined || TiValue === '') {
            return null;
        }
        
        const valid = TmValue < TiValue;
        if(!valid){
            control.get(Tm)?.setErrors({ TmLowerThanTiError: true });
            control.get(Ti)?.setErrors({ TmLowerThanTiError: true });
        }
        else{
            compareFieldsHelper(control.get(Tm), 'TmLowerThanTiError');
            compareFieldsHelper(control.get(Ti), 'TmLowerThanTiError');
        }
        return null;
    }
}

function compareFieldsHelper(control: AbstractControl | null, errorKey: string): void {
    if (control) {
        const errors = control.errors ? { ...control.errors } : {};
        delete errors[errorKey];
        control.setErrors(Object.keys(errors).length ? errors : null);
    }
}
