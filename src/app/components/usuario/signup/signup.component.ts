import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignUpRequest } from 'src/app/payload/request/auth/SignUpRequest';
import { Router } from '@angular/router';
import { Validaciones } from 'src/app/utils/Validaciones';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signUpForm!: FormGroup;
    signUpRequest?: SignUpRequest;

    roles: Array<any> = [
        { name: 'USER', value: 'USER'},
        { name: 'ADMIN', value: 'ADMIN'}
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit(): void {
        this.initSignUpForm();
    }

    nombreMessage: any = {
        required: "El campo nombre es requerido.",
        minlength: "El nombre debe ser minimo de 3 caracteres.",
        maxlength: "El nombre debe ser maximo de 50 caracteres.",
        pattern: "El campo nombre solo debe contener caracteres y no permite espacion ni caracteres especiales"
    };

    apellidosMessage: any = {
        required: "El campo apellido es requerido.",
        minlength: "El apellido debe ser minimo de 3 caracteres.",
        maxlength: "El apellido debe ser maximo de 50 caracteres.",
        pattern: "El campo apellido solo debe contener caracteres"
    };

    edadMessage: any = {
        required: "El campo edad es requerido.",
        min: "Solo esta permitida como edad minima de 18 años.",
        max: "Solo esta permitida como edad maxima de 100 años."
    };

    dniMessage: any = {
        required: "El campo dni es requerido.",
        pattern: "El dni debe contener 8 digitos."
    };

    correoMessage: any = {
        required: "El campo correo es requerido.",
        pattern: "El correo es invalido."
    };

    contrasenaMessage: any = {
        required: "El campo contraseña es requerido.",
        pattern: "La contraseña debe ser minimo de 8 caracteres, contar con al menos 1 caracter especial y al menos un numero"
    }

    //Iniciamos el formulario de registro preparado para escuchar las validaciones
    initSignUpForm(): void {
        this.signUpForm = this.fb.group({
            nombre: [null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
                Validators.pattern(Validaciones.TEXT_NOT_CONTAIN_SPACE)
            ]],
            apellidos: [null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
                Validators.pattern(Validaciones.TEXT)
            ]],
            edad: [18, [
                Validators.required,
                Validators.min(18),
                Validators.max(100)
            ]],
            dni: [null, [
                Validators.required,
                Validators.pattern(Validaciones.DNI)
            ]],
            correo: [null, [
                Validators.required,
                Validators.pattern(Validaciones.EMAIL)
            ]],
            contrasena: [null, [
                Validators.required,
                Validators.pattern(Validaciones.PASSWORD)
            ]],
            roles: this.fb.array([], [
                Validators.required
            ])
        });
    }

    onChkRoles(event: any): void {
        const selectedRoles = (this.signUpForm.controls['roles'] as FormArray);

        if(event.target.checked){
            selectedRoles.push(new FormControl(event.target.value));
        } else {
            const index = selectedRoles.controls.findIndex(x => x.value === event.target.value);
            selectedRoles.removeAt(index);
        }
    }

    onSignUp(): void {
        let signUp: SignUpRequest = this.signUpForm.value;
        this.usuarioService.registrar(signUp).subscribe(res => {
            console.log(res);
            this.router.navigate(['/usuario/login']);
        });
    }

}
