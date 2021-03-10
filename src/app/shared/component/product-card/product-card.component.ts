import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DisplayType} from '../../../modules/shop/department/department.component';
import {Product} from '../../model/product.model';
import {select, Store} from '@ngrx/store';
import {CartState} from '../../../core/store/cart/cart.reducer';
import {addAllToCart, addToCart, clearCart} from '../../../core/store/cart/cart.action';
import {CartItem} from '../../model/cartItem.model';
import {UserActivityService} from '../../../core/service/user-activity.service';
import {WishState} from '../../../core/store/wishlist/wish.reducer';
import {Wish} from '../../model/wish.model';
import {addToWish} from '../../../core/store/wishlist/wish.action';
import {take} from 'rxjs/operators';
import {Cloner} from '../../../core/helper/cloner';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  showCartModal = false;
  showWishModal = false;
  @Input()
  displayType: DisplayType = DisplayType.GRID;
  addingToCart = false;
  addingToWish = false;
  @Input()
  product: Product;
  cartItem: CartItem = new CartItem();
  wish: Wish = new Wish();
  constructor(private store: Store<{cart: CartState, wish: WishState}>, private userActivityService: UserActivityService) {
  }

  ngOnInit(): void {
  }

  async addToCart(): Promise<void> {
    if (!this.addingToCart) {
      const cart = new CartItem();
      cart.product = this.product;
      cart.quantity = 1;
      this.addingToCart = true;
      this.store.dispatch(addToCart({cart}));
      let data = await this.store.pipe(select(state => state.cart.cart),
        take(1)).toPromise();
      data = Cloner.cloneArray(data);
      data.forEach(value => {
        if (value.product.id === this.product.id) {
          this.userActivityService.addToCart(value).subscribe(res => {
            value.id = res.id;
            this.store.dispatch(clearCart());
            this.store.dispatch(addAllToCart({cartItems: data}));
            this.showCartModal = true;
            this.addingToCart = false;
          });
          this.cartItem = value;
        }
      });
    }
  }

  addToWishList(): void {
    if (!this.addingToWish) {
      const wish = new Wish();
      wish.product = this.product;
      wish.quantity = 1;
      this.addingToWish = true;
      this.store.dispatch(addToWish({wish}));
      setTimeout(() => {
        this.showWishModal = true;
        this.addingToWish = false;
      }, 1000);
      this.wish = wish;
    }
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }

  closeWishModal(): void {
    this.showWishModal = false;
  }
}
