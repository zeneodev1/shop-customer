import { Injectable } from '@angular/core';
import {CartItem} from '../../shared/model/cartItem.model';
import {UserService} from './user.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Wish} from '../../shared/model/wish.model';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private api_url = environment.api_url;
  constructor(private httpClient: HttpClient ) { }

  getCartFromStorage(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  getCart(): Observable<CartItem[]> {
    if (UserService.isAuthenticated()) {
      const user = UserService.getUserObject();
      return this.httpClient.get<CartItem[]>(this.api_url + '/userActivity/' + user.id + '/cart');
    } else {
      let cart = this.getCartFromStorage();
      if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
        cart = [];
      }
      return of(cart);
    }
  }

  deleteCart(cartItem: CartItem): void  {
    if (UserService.isAuthenticated()) {
      this.httpClient.delete(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/cart/' + cartItem.id).subscribe();
    } else {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart'));
      const newItems: CartItem[] = [];
      cartItems.forEach(value => {
        if (value.product.id !== cartItem.product.id) {
          newItems.push(value);
        }
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
  }

  addToCart(cartItem: CartItem): Observable<any>  {
    if (UserService.isAuthenticated()) {
      return this.httpClient.post(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/cart', cartItem);
    } else {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart'));
      const newItems: CartItem[] = [];
      let f = false;
      cartItems.forEach(value => {
        if (value.product.id === cartItem.product.id) {
          value.quantity++;
          f = true;
        }
        newItems.push(value);
      });
      if (!f) {
        newItems.push(cartItem);
      }
      localStorage.setItem('cart', JSON.stringify(newItems));
      return of(null);
    }
  }

  getWishList(): Observable<Wish[]> {
    return this.httpClient.get<Wish[]>(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/wish');
  }


  saveAllWishList(wish: Wish[]): Observable<Wish[]> {
    return this.httpClient.post<Wish[]>(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/wish/all', wish);
  }

  saveAllCart(cart: CartItem[]): Observable<CartItem[]> {
    if (UserService.isAuthenticated()) {
      return this.httpClient.post<CartItem[]>(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/cart/all', cart);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      return of(cart);
    }
  }

  clearCart(): void {
    if (UserService.isAuthenticated()) {
      this.httpClient.delete(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/clearCart').subscribe();
    } else {
      localStorage.setItem('cart', '[]');
    }
  }

  deleteWish(wish: Wish): void  {
    this.httpClient.delete(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/wish/' + wish.id).subscribe();
  }

  addToWishList(wish: Wish): Observable<any>  {
    return this.httpClient.post(this.api_url + '/userActivity/' + UserService.getUserObject().id + '/wish', wish);
  }

}
