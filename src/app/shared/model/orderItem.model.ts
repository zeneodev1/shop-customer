import {RateMode, ShippingQuote} from './shippingQuotes.model';
import {CartItem} from './cartItem.model';

export class OrderItem {

  shippingMode: RateMode;
  cartItem: CartItem;
  shippingQuote: ShippingQuote;

  constructor(shippingMode: RateMode, cartItem: CartItem, shippingQuote: ShippingQuote) {
    this.shippingMode = shippingMode;
    this.cartItem = cartItem;
    this.shippingQuote = shippingQuote;
  }
}
