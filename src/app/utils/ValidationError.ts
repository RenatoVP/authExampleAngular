import { AbstractControl } from '@angular/forms';

export class ValidationError {

    public static getErrors(controlName: AbstractControl, messagesErrors: any) {
        let errors: any[] = [];

        if(controlName?.touched && controlName?.errors){
            Object.keys(controlName.errors).map(error => {
                errors.push(messagesErrors[error]);
            });
        }

        return errors;
    }
}
