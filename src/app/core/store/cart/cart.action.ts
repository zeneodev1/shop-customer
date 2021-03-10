import {createAction, props} from '@ngrx/store';
import {CartItem} from '../../../shared/model/cartItem.model';


export const addToCart = createAction('[Cart add]', props<{cart: CartItem}>());
export const EditCart = createAction('[Cart edit]', props<{cart: CartItem}>());
export const removeFromCart = createAction('[Cart remove]', props<{cart: CartItem}>());
export const addAllToCart = createAction('[Cart add all]', props<{cartItems: CartItem[]}>());
export const clearCart = createAction('[Cart clear]');
