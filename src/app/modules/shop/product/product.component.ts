import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../core/service/products.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../shared/model/product.model';
import {CartItem} from '../../../shared/model/cartItem.model';
import {Store} from '@ngrx/store';
import {CartState} from '../../../core/store/cart/cart.reducer';
import {addToCart} from '../../../core/store/cart/cart.action';
import {UserActivityService} from '../../../core/service/user-activity.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  loadingProduct = false;
  product: Product = new Product();
  selectedImage = 0;
  cartQuantity = 1;
  showCartModal = false;
  addingToCart = false;
  cartItem: CartItem = new CartItem();
  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private userActivityService: UserActivityService,
              private store: Store<{cart: CartState}>) {
    activatedRoute.paramMap.subscribe(value => {
      this.loadProduct(value.get('productName'));
    });
  }

  ngOnInit(): void {
  }

  loadProduct(name: string): void {
    this.loadingProduct = true;
    this.productsService.getProductByName(name).subscribe(value => {
      console.log(this.product);
      this.product = value;
      this.loadingProduct = false;
    });
  }

  increaseCart(): void {
    this.cartQuantity++;
  }

  decreaseCart(): void {
    if (this.cartQuantity > 1) {
      this.cartQuantity--;
    }
  }

  selectImage(selected: number): void {
    this.selectedImage = selected;
  }

  nextImage(): void {
    if (this.selectedImage < this.product.images.length - 1) {
      this.selectedImage++;
    }
  }

  prevImage(): void {
    if (this.selectedImage > 0) {
      this.selectedImage--;
    }
  }

  addToCart(): void {
    if (!this.addingToCart) {
      const cart = new CartItem();
      cart.product = this.product;
      cart.quantity = this.cartQuantity;
      this.addingToCart = true;
      setTimeout(() => {
        this.store.dispatch(addToCart({cart}));
        this.store.forEach(state => {
          console.log(cart);
          state.cart.cart.forEach(value1 => {
            if (value1.product.id === this.product.id) {
              this.showCartModal = true;
              this.userActivityService.addToCart(value1);
              this.cartItem = value1;
            }
          });
        });
        this.addingToCart = false;
      }, 1000);
    }
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }

}
