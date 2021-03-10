import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../../shared/model/cartItem.model';
import {UserActivityService} from '../../../core/service/user-activity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {CartState} from '../../../core/store/cart/cart.reducer';
import {addAllToCart, clearCart, removeFromCart} from '../../../core/store/cart/cart.action';
import {Cloner} from '../../../core/helper/cloner';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subTotal = 0;
  showAddressForm = false;
  addressForm: FormGroup;
  isLoadingCart = true;
  isUpdating = false;
  constructor(private userActivityService: UserActivityService,
              private store: Store<{cart: CartState}>) {
    this.addressForm = new FormGroup({
      country: new FormControl('select', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required)
    });
    userActivityService.getCart().toPromise().then(value => {
      this.isLoadingCart = false;
      store.dispatch(clearCart());
      store.dispatch(addAllToCart({cartItems: value}));
    });
    store.select(state => state.cart).subscribe(value => {
      this.cartItems = Cloner.cloneArray<CartItem>(value.cart);
      this.subTotal = 0;
      this.cartItems.forEach(value1 => {
        this.subTotal += value1.product.price * value1.quantity;
      });
    });
  }

  ngOnInit(): void {
  }

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
  }

  increase(i: number): void {
    this.cartItems[i].quantity++;
  }

  decrease(i: number): void {
    if (this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity--;
    }
  }

  updateCart(): void {
    this.isUpdating = true;
    this.userActivityService.saveAllCart(this.cartItems).toPromise().then(value => {
      this.isUpdating = false;
      this.store.dispatch(clearCart());
      this.store.dispatch(addAllToCart({cartItems: value}));
    });
  }

  remove(i: number): void {
    this.isUpdating = true;
    setInterval(() => {
      this.store.dispatch(removeFromCart({cart: this.cartItems[i]}));
      this.isUpdating = false;
    }, 800);
    this.userActivityService.deleteCart(this.cartItems[i]);
  }

  clearCart(): void {
    this.userActivityService.clearCart();
    this.store.dispatch(clearCart());
  }
}
