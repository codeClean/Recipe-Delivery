import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaust, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromAppRoot from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginIterceptorService implements HttpInterceptor {

    constructor(private store: Store<fromAppRoot.AppState>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

       // return this.loginSer.user.pipe(take(1), exhaustMap(user => {
        return this.store.select('authState').pipe(take(1), map(authUser => authUser.user), exhaustMap(user => {
         //  console.log(' inside interceptor ');

           if (!user) {
                return next.handle(req);
            }
           const modified = req.clone({ params: new HttpParams().set('auth', user.token) });

           return next.handle(modified);
        })
        );
    }
}
