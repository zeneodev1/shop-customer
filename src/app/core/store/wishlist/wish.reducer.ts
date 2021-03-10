import {Action, createReducer, on} from '@ngrx/store';
import {addAllToWish, addToWish, clearWish, removeFromWish} from './wish.action';
import {Wish} from '../../../shared/model/wish.model';

export interface WishState {
  wish: Wish[];
}

const INIT_WISH_STATE: WishState = {
  wish: []
};

const WISH_REDUCER = createReducer<WishState>(INIT_WISH_STATE, on(addAllToWish, (mState, {wish}) => {
    return {wish};
  }), on(clearWish, mState => {
    return {wish: []};
  }), on(addToWish, (mState, {wish}) => {
    let found = false;
    const newWishes: Wish[] = [];
    mState.wish.forEach(v => {
      const mWish = {...v};
      if (wish.product.id === mWish.product.id) {
        found = true;
        mWish.quantity += wish.quantity;
      }
      newWishes.push(mWish);
    });
    if (!found) {
      return {wish: [...mState.wish, wish]};
    } else {
      return {wish: newWishes};
    }
  }), on(removeFromWish, (mState, {id}) => {
    const newWishes: Wish[] = [];
    mState.wish.forEach(c => {
      if (c.id !== id) {
        newWishes.push(c);
      }
    });
    return {wish: newWishes};
  })
);

export function wishReducer(state: WishState | undefined, action: Action): any {
  return WISH_REDUCER(state, action);
}

