import { Component, OnInit } from '@angular/core';
import {CustomerInfo} from '../../shared/model/customer-info.model';
import {UserActivityService} from '../../core/service/user-activity.service';
import {CartItem} from '../../shared/model/cartItem.model';
import {OrderItem} from '../../shared/model/orderItem.model';
import {CheckoutService} from '../../core/service/checkout.service';
import {Order} from '../../shared/model/order.model';
import {Transaction} from '../../shared/model/transaction.model';
import {Address} from '../../shared/model/address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  step = 1;
  customerInfo: CustomerInfo = new CustomerInfo();
  cartItems: CartItem[] = [];
  orderItems: OrderItem[] = [];
  address: Address = new Address();
  loadingCart = true;
  total = 0;
  displaying = 'steps';
  transaction: Transaction = new Transaction();
  constructor(private userActivityService: UserActivityService, private checkoutService: CheckoutService) {
    userActivityService.getCart().subscribe(value => {
      this.cartItems = value;
      this.cartItems.forEach(value1 => {
        this.total += value1.quantity * value1.product.price;
      });
      this.cartItems.forEach(item => {
        this.orderItems.push(new OrderItem(null, item, null));
      });
      this.loadingCart = false;
    });
  }

  ngOnInit(): void {
  }

  continue(): void {
    this.step++;
  }

  checkout(method: string): void {
    this.displaying = 'validation';
    const order = new Order();
    order.orderItems = this.orderItems;
    order.paymentMethod = method;
    order.address = this.address;
    this.checkoutService.validateOrders(order).subscribe(value => {
      this.transaction = value;
      this.displaying = 'payment';
    });
  }

  back(): void {
    this.step--;
  }

  calculateShipping(): number {
    let cost = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.orderItems.length; i++) {
      if (this.orderItems[i].shippingMode !== null) {
        cost += this.orderItems[i].shippingMode.price.min.moneyAmount.amount;
      } else {
        return 0;
      }
    }
    return cost;
  }
}
