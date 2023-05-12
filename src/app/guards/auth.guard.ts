import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenstorageService } from '../services/tokenstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private tokenStorage: TokenstorageService,
        private router: Router
    ){}

    //Verifica si el usuario ha ingresado session, sino retorna a la pagina de formulario de login
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.tokenStorage.getToken() != null && this.tokenStorage.getUser() != null){
            return true;
        }

        this.router.navigate(['usuario/login']);
        return false;
    }

}
