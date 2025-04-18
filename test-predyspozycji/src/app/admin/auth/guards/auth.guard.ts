/////////////////////////////////////////////
// GUARD TO CHECK IF USER IS AUTHENTICATED //
/////////////////////////////////////////////

// imports

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

// declare guard class as injectable
// implement canactivate interface which allow class
// to decide if route is activated or cancelled
// it is activated if returns true

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (private authService: AuthService, private router: Router) {}

    // function decides if route is activated
    // it is if user is authenticated
    // if not then navigate to login component

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/admin/login']);
        }
        return isAuth;
    }

}