import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";


@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: ConfirmEqualValidatorDirective,
            multi: true
        }]
})
export class ConfirmEqualValidatorDirective implements Validator {
    // @Input() appConfirmEqualValidator: string;
    // validate(control: AbstractControl): { [key: string]: any } | null {
    //     const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
    //     if (controlToCompare && controlToCompare.value !== control.value) {
    //         return { 'notEqual': true };
    //     }
    //     return null;
    // }

    validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
        const passwordControl = passwordGroup.get('password');
        const passwordConfirmControl = passwordGroup.get('confirmPassword');
        if (passwordControl && passwordConfirmControl && passwordControl.value !== passwordConfirmControl.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}