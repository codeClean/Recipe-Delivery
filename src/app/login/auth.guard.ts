
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../store/app.reducer';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private route: ActivatedRoute,
                private store: Store<fromAppRoot.AppState>,
                @Inject(PLATFORM_ID) private platformId) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {

        // return this.loginSer.user.pipe(take(1), map(user => {

        return this.store.select('authState').pipe(take(1),
            map(authUser => {
                return authUser.user;
            }),
            map(user => {
                if (isPlatformBrowser(this.platformId)) {
                   // console.log(' inside guard');
                    const isAuthenticated = !!user;
                    if (isAuthenticated) {
                        // console.log(' you passed the guard ');
                        return true;
                    } else {
                        // console.log(' are you logging me out ');
                        return this.router.createUrlTree(['/login']);
                    }
                }
                return true;
            }));
    }
}
