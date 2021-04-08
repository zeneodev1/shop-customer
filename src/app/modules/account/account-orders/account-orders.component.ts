import { Component, OnInit } from '@angular/core';
import {Order} from '../../../shared/model/order.model';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
