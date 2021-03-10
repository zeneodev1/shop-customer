import {createAction, props} from '@ngrx/store';
import {User} from '../../../shared/model/user.model';


export const login = createAction('[Auth login]', props<{user: User}>());
export const logout = createAction('[Auth logout]');
