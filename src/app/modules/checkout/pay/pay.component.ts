import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../../shared/model/transaction.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  @Input()
  transaction: Transaction = new Transaction();
  constructor() { }

  ngOnInit(): void {
    if (this.transaction.order.paymentMethod === 'PAYPAL') {
      window.location.href = 'http://localhost:9090/checkout/PayPal/' + this.transaction.id;
    }
  }

}
