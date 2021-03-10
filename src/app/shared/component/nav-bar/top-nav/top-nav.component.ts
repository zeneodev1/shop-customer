import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Department} from '../../../model/department.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../core/store/auth/auth.reducer';
import {CartState} from '../../../../core/store/cart/cart.reducer';
import {UserService} from '../../../../core/service/user.service';
import {login} from '../../../../core/store/auth/auth.action';
import {addAllToCart, clearCart} from '../../../../core/store/cart/cart.action';
import {UserActivityService} from '../../../../core/service/user-activity.service';
import {WishState} from '../../../../core/store/wishlist/wish.reducer';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  hidden = true;
  @Input()
  departments: Department[] = [];
  authState: AuthState = new AuthState();
  cartExpanded = false;
  cartCounter = 0;
  wishCounter = 0;
  accountNavHidden = true;
  constructor(private store: Store<{auth: AuthState, cart: CartState, wish: WishState}>, private userActivityService: UserActivityService) {
    if (UserService.isAuthenticated()) {
      store.dispatch(login({user: UserService.getUserObject()}));
    } else {
      userActivityService.getCart().toPromise().then(value => {
        store.dispatch(clearCart());
        store.dispatch(addAllToCart({cartItems: value}));
      });
    }

    store.select(state => state.auth).subscribe(value => {
      this.authState = value;
    });
    store.select(state => state.cart.cart.length).subscribe(value => {
      this.cartCounter = value;
    });
    store.select(state => state.wish.wish.length).subscribe(value => {
      this.wishCounter = value;
    });
  }

  ngOnInit(): void {
  }

  toggleCart(): void {
    this.cartExpanded = !this.cartExpanded;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event): void {
    if (this.cartExpanded) {
      this.toggleCart();
    }
  }

}
