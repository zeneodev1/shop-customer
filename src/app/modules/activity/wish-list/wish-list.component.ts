import { Component, OnInit } from '@angular/core';
import {UserActivityService} from '../../../core/service/user-activity.service';
import {Wish} from '../../../shared/model/wish.model';
import {select, Store} from '@ngrx/store';
import {WishState} from '../../../core/store/wishlist/wish.reducer';
import {addAllToWish, clearWish, removeFromWish} from '../../../core/store/wishlist/wish.action';
import {addAllToCart} from '../../../core/store/cart/cart.action';
import {CartItem} from '../../../shared/model/cartItem.model';
import {take} from 'rxjs/operators';
import {CartState} from '../../../core/store/cart/cart.reducer';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList: Wish[];
  loading = false;
  addingToCart = false;
  constructor(private userActivityService: UserActivityService,
              private store: Store<{wish: WishState, cart: CartState}>) {
    this.loading = true;
    userActivityService.getWishList().toPromise().then(value => {
      this.wishList = value;
      this.loading = false;
    });
    store.select(state => state.wish.wish).subscribe(value => {
      this.wishList = value;
    });
  }

  ngOnInit(): void {
  }

  increaseCart(i: number): void {
    this.wishList[i].quantity++;
  }

  decreaseCart(i: number): void {
    if (this.wishList[i].quantity > 1) {
      this.wishList[i].quantity--;
    }
  }

  remove(i: number): void {
    this.store.dispatch(removeFromWish({id: this.wishList[i].id}));
    this.wishList = this.wishList.filter(value => {
      return this.wishList[i].id !== value.id;
    });
  }

  saveAll(): void {
    this.loading = true;
    this.userActivityService.saveAllWishList(this.wishList).subscribe(value => {
      this.store.dispatch(clearWish());
      this.store.dispatch(addAllToWish({wish: value}));
      this.store.forEach(ws => {
        this.wishList = ws.wish.wish;
        this.loading = false;
      });
    });
  }

  async addAllToCart(): Promise<void> {
    if (!this.addingToCart) {
      this.addingToCart = true;
      const cart: CartItem[] = [];
      this.wishList.forEach(value => {
        const cartItem: CartItem = new CartItem();
        cartItem.quantity = value.quantity;
        cartItem.product = value.product;
        cart.push(cartItem);
      });
      this.store.dispatch(addAllToCart({cartItems: cart}));
      const data = await this.store.pipe(select(state => state.cart.cart),
        take(1)).toPromise();
      this.userActivityService.saveAllCart(data).subscribe(value => {
        this.addingToCart = false;
      });
    }
  }

}
