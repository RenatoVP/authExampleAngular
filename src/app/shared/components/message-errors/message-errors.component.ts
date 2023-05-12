import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-message-errors',
    template:  `<small class="message-block message-error" *ngFor="let errorMessage of showMessages()">
        {{ errorMessage }}
    </small>`,
    styles: [
        ".message-block { display: block; }",
        ".message-error { color: red; }"
    ]
})
export class MessageErrorsComponent implements OnInit {

    @Input() controlName?: AbstractControl;
    @Input() messages?: any;

    private errors: any = [];

    constructor() { }

    ngOnInit(): void {

    }

    showMessages(){
        if(this.controlName?.errors){
            this.errors = [];
            Object.keys(this.controlName.errors).map(error => {
                if(this.controlName?.touched || this.controlName?.dirty){
                    this.errors.push(this.messages[error]);
                }
            });

            return this.errors;
        }
    }

}
