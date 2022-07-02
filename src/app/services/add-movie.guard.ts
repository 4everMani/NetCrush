import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { Admin } from "../aap-constants";
import { AuthFacade } from "../store/auth.facade";


@Injectable()
export class AddMovieGuard implements CanActivate{

    constructor(private authStore: AuthFacade,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
       return this.authStore.user$
           .pipe(
            tap(res => console.log(res?.email)),
            map(res => res?.email === Admin.EMAIL ? true : this.router.parseUrl('/movies'))
           )
    }

}    