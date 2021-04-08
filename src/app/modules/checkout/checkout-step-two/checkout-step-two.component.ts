import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../../shared/model/cartItem.model';
import {OrderItem} from '../../../shared/model/orderItem.model';

@Component({
  selector: 'app-checkout-step-two',
  templateUrl: './checkout-step-two.component.html',
  styleUrls: ['./checkout-step-two.component.css']
})
export class CheckoutStepTwoComponent implements OnInit {
  @Output()
  continue: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  orderItems: OrderItem[] = [];
  selectShippingModal = -1;
  triedToSubmit = false;
  constructor() { }

  ngOnInit(): void {
  }

  showSelectShippingModal(i): void {
    this.selectShippingModal = i;
  }

  submitShippingMethods(): void {
    let invalid = false;
    this.triedToSubmit = true;
    this.orderItems.forEach(value => {
      if (value.shippingMode === null || value.shippingQuote === null) {
        invalid = true;
      }
    });
    if (!invalid) {
      this.continue.emit(this.orderItems);
    }
  }
}
