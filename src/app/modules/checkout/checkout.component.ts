import { Component, OnInit } from '@angular/core';
import {CustomerInfo} from '../../shared/model/customer-info.model';
import {UserActivityService} from '../../core/service/user-activity.service';
import {CartItem} from '../../shared/model/cartItem.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  step = 1;
  customerInfo: CustomerInfo = new CustomerInfo();
  cartItems: CartItem[] = [];
  loadingCart = true;
  total = 0;
  constructor(private userActivityService: UserActivityService) {
    userActivityService.getCart().subscribe(value => {
      this.cartItems = value;
      this.cartItems.forEach(value1 => {
        this.total += value1.quantity * value1.product.price;
      });
      this.loadingCart = false;
    });
  }

  ngOnInit(): void {
  }

  continue(): void {
    this.step++;
  }

  back(): void {
    this.step--;
  }
}
