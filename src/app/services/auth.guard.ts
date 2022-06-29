import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { from, map, Observable, of, tap } from "rxjs";
import { AuthFacade } from "../store/auth.facade";

@Injectable()
export class AuthGurad implements CanActivate{

    constructor(private authStore: AuthFacade,
                private afAuth: AngularFireAuth,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
       return this.authStore.initAuthentication()
           .pipe(
            map(res => res ? true : this.router.parseUrl('/login'))
           )
    }
}