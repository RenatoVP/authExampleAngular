import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenstorageService } from './../../../services/tokenstorage.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginRequest } from 'src/app/payload/request/auth/LoginRequest';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    //Login Validation Variables
    isLoggedIn: boolean = false;
    isLogginFailed : boolean = false;

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private tokenStorageService: TokenstorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.initLoginForm();
    }

    onLogin(): void {
        const loginRequest: LoginRequest = this.loginForm.value;

        this.usuarioService.ingresar(loginRequest).subscribe({
            next: (data: any) => {
                this.tokenStorageService.saveToken(data.token);
                this.tokenStorageService.saveUser(data);

                this.isLoggedIn = true;

                this.router.navigate(['/']);
            },
            error: err => {
                this.isLogginFailed = true;
            }
        });
    }

    initLoginForm(): FormGroup {
        return this.fb.group({
            correo: [ '', [
                Validators.required,
                Validators.email
            ]],
            contrasena: [ '', [ Validators.required ] ]
        });
    }

    verifyUserIsLoggedIn() {
        if(this.tokenStorageService.getToken()){

        }
    }

}
