import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShippingQuote} from '../../shared/model/shippingQuotes.model';
import {Cloner} from '../helper/cloner';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'https://ship.freightos.com/api/shippingCalculator';
  constructor(private httpClient: HttpClient) { }

  getQuotes(shippingQuote: ShippingQuote): Observable<any> {
    const params: {} = Cloner.cloneObject(shippingQuote);
    return this.httpClient.get(this.apiUrl, {
      params: new HttpParams({fromObject: params})
    });
  }
}
