import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartItem} from '../../../model/cartItem.model';
import {CartState} from '../../../../core/store/cart/cart.reducer';
import {Store} from '@ngrx/store';
import {removeFromCart} from '../../../../core/store/cart/cart.action';
import {UserActivityService} from '../../../../core/service/user-activity.service';

@Component({
  selector: 'app-nav-cart',
  templateUrl: './nav-cart.component.html',
  styleUrls: ['./nav-cart.component.css']
})
export class NavCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  @Output()
  closeCart: EventEmitter<void>;
  totalCart = 0;
  constructor(private store: Store<{cart: CartState}>, private userActivityService: UserActivityService) {
    this.closeCart = new EventEmitter<void>();
    store.select(state => state.cart.cart).subscribe(value => {
      this.cartItems = value;
      this.totalCart = 0;
      this.cartItems.forEach(value1 => {
        this.totalCart += value1.quantity * value1.product.price;
      });
    });
  }

  ngOnInit(): void {
  }

  onClickClose(): void {
    this.closeCart.emit();
  }

  deleteFromCart(cartItem: CartItem): void {
    this.store.dispatch(removeFromCart({cart: cartItem}));
    this.userActivityService.deleteCart(cartItem);
  }

}
