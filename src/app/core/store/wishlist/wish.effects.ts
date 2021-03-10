import {Injectable} from '@angular/core';
import {UserActivityService} from '../../service/user-activity.service';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {addToWish, removeFromWish} from './wish.action';
import {Store} from '@ngrx/store';
import {WishState} from './wish.reducer';
import {Wish} from '../../../shared/model/wish.model';
import {Cloner} from '../../helper/cloner';

@Injectable()
export class WishEffects {

  addToWishList = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToWish),
        concatLatestFrom(action => this.store.select(state => state.wish.wish)),
        tap(([action, wishList]) => {
          const data = Cloner.cloneArray(wishList);
          data.forEach(w => {
            if (w.product.id === action.wish.product.id) {
              this.userActivityService.addToWishList(w).subscribe(value => {
                w.id = value.id;
              });
            }
          });
        })
      ),
    { dispatch: false }
  );

  removeFromWishList = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromWish),
        tap(action => {
          const wish = new Wish();
          wish.id = action.id;
          this.userActivityService.deleteWish(wish);
        })
      ),
    { dispatch: false }
  );


  constructor(private userActivityService: UserActivityService,
              private actions$: Actions,
              private store: Store<{wish: WishState}>) {
  }
}
