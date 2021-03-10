import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wish} from '../../../../shared/model/wish.model';
import {removeFromWish} from '../../../../core/store/wishlist/wish.action';
import {Store} from '@ngrx/store';
import {WishState} from '../../../../core/store/wishlist/wish.reducer';
import {UserActivityService} from '../../../../core/service/user-activity.service';
import {CartItem} from '../../../../shared/model/cartItem.model';
import {CartState} from '../../../../core/store/cart/cart.reducer';
import {addToCart} from '../../../../core/store/cart/cart.action';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css']
})
export class WishItemComponent implements OnInit {
  @Input()
  wish: Wish;
  @Output()
  decreaseAmount: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  increaseAmount: EventEmitter<void> = new EventEmitter<void>();
  addingToCart = false;
  constructor(private userActivityService: UserActivityService,
              private store: Store<{wish: WishState, cart: CartState}>) { }

  ngOnInit(): void {
  }

  increaseCart(): void {
    this.increaseAmount.emit();
  }

  decreaseCart(): void {
    this.decreaseAmount.emit();
  }

  remove(): void {
    this.store.dispatch(removeFromWish({id: this.wish.id}));
  }

  addToCart(): void {
    if (!this.addingToCart) {
      const cart = new CartItem();
      cart.product = this.wish.product;
      cart.quantity = this.wish.quantity;
      this.addingToCart = true;
      setTimeout(() => {
        this.store.dispatch(addToCart({cart}));
        this.store.forEach(state => {
          console.log(state.cart.cart);
          state.cart.cart.forEach(value1 => {
            if (value1.product.id === this.wish.product.id) {
              this.userActivityService.addToCart(value1);
            }
          });
        }).then();
        this.addingToCart = false;
      }, 1000);
    }
  }

}
