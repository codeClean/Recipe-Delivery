import { Action } from '@ngrx/store';

export const LOGIN_START = ' [Auth] LOGIN_START';
export const SIGNUP_START = ' [Auth] SIGNUP_START';

export const AUTH_FAIL = '[Auth] LOGIN_FAIL';
export const AUTH_SUCCESS = '[Auth] USER_LOGGING';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';

export const USER_LOGOUT = '[Auth] USER_LOGOUT';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const AUTO_LOGOUT = '[Auth] AUTO_LOGOUT';


export interface AuthenticationObj {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
}
export class AuthSuccess implements Action {
    type =  AUTH_SUCCESS;
    constructor(public payload: AuthenticationObj) {}
}
export class UserLogout implements Action {
    type =  USER_LOGOUT;
 }
export class LoginStart implements Action {
    type =  LOGIN_START;
   constructor(public payload: {email: string, password: string}) {}
 }
export class SignUpStart implements Action {
    type =  SIGNUP_START;
   constructor(public payload: {email: string, password: string}) {}
 }
export class AuthFail implements Action {
    type =  AUTH_FAIL;
    constructor( public payload: string) {}
  }

export class ClearError implements Action {
      type = CLEAR_ERROR;
  }

export class AutoLogin implements Action {
      type = AUTO_LOGIN;
  }
export type _auth = AuthSuccess | UserLogout | LoginStart | AuthFail | SignUpStart | ClearError | AutoLogin ;
