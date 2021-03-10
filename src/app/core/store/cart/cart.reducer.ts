import {Action, createReducer, on} from '@ngrx/store';
import {CartItem} from '../../../shared/model/cartItem.model';
import {addAllToCart, addToCart, clearCart, removeFromCart} from './cart.action';
import {Cloner} from '../../helper/cloner';
import {log} from 'util';

export interface CartState {
  cart: CartItem[];
}

const INIT_CART_STATE: CartState = {
  cart: []
};

const CART_REDUCER = createReducer<CartState>(INIT_CART_STATE, on(addAllToCart, (mState, {cartItems}) => {
    if (cartItems === null) {
      return {cart: mState.cart};
    } else {
      const arr: CartItem[] = Cloner.cloneArray(mState.cart);
      const items: CartItem[] = Cloner.cloneArray(cartItems);
      for (let i = 0; i < items.length; i++) {
        const c1 = items[i];
        let found = false;
        for (const c2 of mState.cart) {
          if (c1.product.id === c2.product.id) {
            found = true;
            break;
          }
        }
        if (!found) {
          arr.push(c1);
          items.splice(i, 1);
          i--;
        }
      }
      for (let i = 0; i < items.length; i++) {
        const c1 = items[i];
        for (const c2 of arr) {
          if (c1.product.id === c2.product.id) {
            c2.quantity += c1.quantity;
            break;
          }
        }
      }
      return {cart: [...arr]};
    }
  }), on(clearCart, mState => {
    return {cart: []};
  }), on(addToCart, (mState, {cart}) => {
    console.log(cart);
    let found = false;
    const newCartItems: CartItem[] = [];
    mState.cart.forEach(v => {
      const cartItem = {...v};
      if (cart.product.id === cartItem.product.id) {
        found = true;
        cartItem.quantity += cart.quantity;
      }
      newCartItems.push(cartItem);
    });
    if (!found) {
      console.log('!f');
      return {cart: [...mState.cart, cart]};
    } else {
      console.log('f');
      return {cart: newCartItems};
    }
  }), on(removeFromCart, (mState, {cart}) => {
    const newCartItems: CartItem[] = [];
    mState.cart.forEach(c => {
      if (c.product.id !== cart.product.id) {
        newCartItems.push(c);
      }
    });
    return {cart: newCartItems};
  })
);

export function cartReducer(state: CartState | undefined, action: Action): any {
  return CART_REDUCER(state, action);
}

