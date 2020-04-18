import { User } from '../user.model';
import * as fromAuthAction from './auth.action';

export interface State {
    user: User;
    loginError: string;
    loading: boolean;
}
const initialState: State = {
    user: null,
    loginError: null,
    loading: false
};
export function authReducer(state = initialState, action: fromAuthAction._auth) {
    switch (action.type) {
        case fromAuthAction.AUTH_SUCCESS:
           // console.log(' auth success ' + state.user);
            const newAction = (action as fromAuthAction.AuthSuccess);
            const newUser = new User(
                newAction.payload.email,
                newAction.payload.userId,
                newAction.payload.token,
                newAction.payload.expirationDate);

            return { ...state, user: newUser, loginError: null, loading: false };

       /*  case fromAuthAction.AUTO_LOGIN:
            return {...state, loginError: null, loading: false }; */

        case fromAuthAction.USER_LOGOUT:
         //   console.log(' auth logout ' + state.user);

            return { ...state, user: null, loginError: null, loading: false };
        case fromAuthAction.CLEAR_ERROR:
           // console.log(' auth login/start up ' + state.user);
            return { ...state, loginError: null };

        case fromAuthAction.LOGIN_START:
        case fromAuthAction.SIGNUP_START:
            // console.log(' auth login/start up ' + state.user);

            return { ...state, loginError: null, loading: true };

        case fromAuthAction.AUTH_FAIL:
            console.log(' auth auth fail ' + state.user);

            return { ...state, user: null, loginError: (action as fromAuthAction.AuthFail).payload, loading: false };

        default: return state;

    }

}
