import {User} from '../../../shared/model/user.model';
import {Action, createReducer, on, State} from '@ngrx/store';
import {login, logout} from './auth.action';

export class AuthState {
  authenticated: boolean;
  user: User;
}

const INIT_AUTH_STATE: AuthState = {
  authenticated: false,
  user: null
};


const AUTH_REDUCER = createReducer<AuthState>(INIT_AUTH_STATE, on(login, (mState, {user}) => {
  return {...mState, authenticated: true, user};
}), on(logout, mState => {
  return {user: new User(), authenticated: false};
})
);

export function authReducer(state: AuthState | undefined, action: Action): any {
  return AUTH_REDUCER(state, action);
}
