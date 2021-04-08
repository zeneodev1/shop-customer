import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkout-step-three',
  templateUrl: './checkout-step-three.component.html',
  styleUrls: ['./checkout-step-three.component.css']
})
export class CheckoutStepThreeComponent implements OnInit {
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  checkout: EventEmitter<string> = new EventEmitter<string>();
  paymentMethod: string;
  constructor() {
  }

  ngOnInit(): void {
  }

  onLoadPaymentData(event): any {
    console.log('load payment data', event.detail);
  }
  onPaymentDataChanged($event: any): void {
    console.log($event);
  }
  onPaymentAuthorized($event: any): void {
    console.log($event);
  }

  changePaymentMethod(method: string): void {
    this.paymentMethod = method;
  }

  continue(): void {
    this.checkout.emit(this.paymentMethod);
  }
}
