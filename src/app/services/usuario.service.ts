import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../payload/request/auth/LoginRequest';
import { AuthResponse } from '../payload/response/AuthResponse';
import { SignUpRequest } from '../payload/request/auth/SignUpRequest';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private URL: string = 'http://localhost:8081/api/auth/';

    constructor(private http: HttpClient) { }

    ingresar(loginRequest: LoginRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.URL + "ingresar", loginRequest);
    }

    registrar(signUpRequest: SignUpRequest): Observable<any> {
        const options = {
            responseType: 'text' as const
        };
        return this.http.post<any>(this.URL + "registrar", signUpRequest, { responseType: 'text' as 'json'});
    }
}
