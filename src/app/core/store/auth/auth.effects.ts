import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CartState} from '../cart/cart.reducer';
import {WishState} from '../wishlist/wish.reducer';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {take, tap} from 'rxjs/operators';
import {Wish} from '../../../shared/model/wish.model';
import {UserActivityService} from '../../service/user-activity.service';
import {login, logout} from './auth.action';
import {addAllToCart, clearCart} from '../cart/cart.action';
import {addAllToWish, clearWish} from '../wishlist/wish.action';

@Injectable()
export class AuthEffects {


  loginEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(() => {
          localStorage.setItem('cart', JSON.stringify([]));
          this.userActivityService.getCart().toPromise().then(value => {
            this.store.dispatch(clearCart());
            this.store.dispatch(addAllToCart({cartItems: value}));
            const data = this.store.pipe(select(state => state.cart.cart),
              take(1)).toPromise().then(value1 => {
              this.userActivityService.saveAllCart(value1);
            });

          });
          this.userActivityService.getWishList().toPromise().then(value => {
            this.store.dispatch(addAllToWish({wish: value}));
          });
        })
      ),
    { dispatch: false }
  );

  logoutEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(action => {
          this.store.dispatch(clearCart());
          this.store.dispatch(clearWish());
        })
      ),
    { dispatch: false }
  );



  constructor(private store: Store<{cart: CartState, wish: WishState}>,
              private userActivityService: UserActivityService,
              private actions$: Actions) {
  }


}
