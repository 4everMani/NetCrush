import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthFacade } from "../store/auth.facade";

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private authStore: AuthFacade,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
       return this.authStore.initAuthentication()
           .pipe(
            map(res => res ? this.router.parseUrl('/movies') : true)           
            )
    }
}