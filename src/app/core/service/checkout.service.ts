import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../shared/model/order.model';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../../shared/model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:9090/';
  constructor(private httpClient: HttpClient) { }

  public validateOrders(order: Order): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.apiUrl + 'validation', order);
  }
}
