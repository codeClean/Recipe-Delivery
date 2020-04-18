import { Actions, ofType, Effect } from '@ngrx/effects';
import * as fromAuthAction from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import * as fromAppRoor from '../../store/app.reducer';

export interface AuthenticationResponce {
    kind: string;
    idToken: string;
    email: string;
    refrechToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
let logoutTimer: any = null;
const handleAuthentication = (resData, storePassed) => {

    const exipDate = new Date(new Date().getTime() + resData.expiresIn * 1000);

    const user = new User(resData.email, resData.localId, resData.idToken, exipDate);

    localStorage.setItem('userData', JSON.stringify(user));

    // const expirationTime = new Date(new Date().getTime() + resData.expiresIn * 1000).getTime();

    onAutoLogout(storePassed, resData.expiresIn * 1000) ;

    return new fromAuthAction.AuthSuccess({
        email: resData.email,
        userId: resData.localId,
        token: resData.idToken,
        expirationDate: exipDate,
        redirect: true
    });
};
const onAutoLogout = (storePassed, remainingTime) => {
    console.log(' logged out ' + remainingTime);

    logoutTimer  =  setTimeout(() => {
        storePassed.dispatch( new fromAuthAction.UserLogout());
      }, remainingTime);

};

const handleError = (errorResponse) => {
    let errorMessage = ' unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
        return of(new fromAuthAction.AuthFail(errorMessage));
    }
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = ' This email exists already ';
                             break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist, sign up if you are new ';
                                break;
        case 'INVALID_PASSWORD': errorMessage = 'The password is not correct ';
                                 break;
        default:
            break;
    }
    return of(new fromAuthAction.AuthFail(errorMessage));
};
@Injectable()
export class AuthEffect {
    constructor(private actions$: Actions,
                private http: HttpClient, private router: Router,
                private store: Store<fromAppRoor.AppState>) { } // returns observable

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(fromAuthAction.SIGNUP_START),
        switchMap((authData: fromAuthAction.SignUpStart) => {
            // tslint:disable-next-line: max-line-length
            return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmh60yPbdmY5zKW3ZTpvgEPUteuGEpMhI',
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map(resData => {
                    return handleAuthentication(resData, this.store);

                }), catchError(errorResponse => {
                    return handleError(errorResponse);


                }));
        })
    );
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(fromAuthAction.LOGIN_START),
        switchMap((authData: fromAuthAction.LoginStart) => {
            // tslint:disable-next-line: max-line-length
            return this.http.post<AuthenticationResponce>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmh60yPbdmY5zKW3ZTpvgEPUteuGEpMhI',
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map(resData => {
                    return handleAuthentication(resData, this.store);

                }), catchError(errorResponse => {
                    return handleError(errorResponse);


                }));
        })
    ); // no need to subscribe bc ngrx will subscribe for us
    // swith creates for us an observable from another observable
        @Effect()
        authAutoLogin = this.actions$.pipe(ofType(fromAuthAction.AUTO_LOGIN), map(() => {
            const user: {
                email: string,
                localId: string,
                idToken: string,
                expiresIn: string
              } = JSON.parse(localStorage.getItem('userData'));
            if (!user) {
                  // this is just because effect needs to return sothing: its dummy
                  return {type: 'DUMMY' };
                }

            const loadedUser = new User(user.email, user.localId, user.idToken, new Date(user.expiresIn));

            if (loadedUser.token) {
               // console.log(' got the local user');

            const expirationTemp = new Date(user.expiresIn).getTime();
            const remainingTime = expirationTemp - (new Date().getTime());
            console.log(remainingTime);
            onAutoLogout(this.store, remainingTime);


               // this.user.next(loadedUser);
            return new fromAuthAction.AuthSuccess({
                  email: loadedUser.email,
                  userId: loadedUser.localId,
                  token: loadedUser.token,
                  expirationDate: new Date(user.expiresIn),
                  redirect: false
                });
              }

                  // this is just because effect needs to return something: its dummy
            return {type: 'DUMMY' };

        })
        );

    @Effect({ dispatch: false })
    // tslint:disable-next-line: max-line-length
    authLogout = this.actions$.pipe(ofType(fromAuthAction.USER_LOGOUT), tap(() => {
        // success
             this.router.navigate(['login']);
             localStorage.removeItem('userData');
             console.log(logoutTimer + 'loging out ');

             if (logoutTimer) {
              clearTimeout(logoutTimer);
            }
             console.log(logoutTimer);

             logoutTimer = null;

    })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(fromAuthAction.AUTH_SUCCESS),
    tap((authSuccess: fromAuthAction.AuthSuccess) => {
        if (authSuccess.payload.redirect) {
         console.log(logoutTimer + 'loging successful ');
         this.router.navigate(['/']);
        }

    }));


}
