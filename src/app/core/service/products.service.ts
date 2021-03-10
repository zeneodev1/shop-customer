import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../shared/model/product.model';
import {Department} from '../../shared/model/department.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(productsFilter: any): Observable<Product[]> {
    const mParams: any = {};
    if (productsFilter.dId !== null) {
      mParams.dId = productsFilter.dId;
    }
    if (productsFilter.cId !== null) {
      mParams.cId = productsFilter.cId;
    }
    if (productsFilter.condition !== null && productsFilter.condition !== '') {
      mParams.condition = productsFilter.condition;
    }
    if (productsFilter.min !== undefined) {
      mParams.min = String(productsFilter.min);
    }
    if (productsFilter.max !== undefined) {
      mParams.max = String(productsFilter.max);
    }
    if (productsFilter.page !== undefined) {
      mParams.page = String(productsFilter.page);
    }
    if (productsFilter.size !== undefined) {
      mParams.size = String(productsFilter.size);
    }
    mParams.order = productsFilter.order;
    mParams.sortBy = productsFilter.sortBy;

    return this.httpClient.get<Product[]>(this.API_URL + '/products', {
      params: new HttpParams({fromObject: mParams})
    });
  }

  getProductById(id: string | null): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL + '/products/' + id);
  }

  getProductByName(name: string): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL + '/products/name/' + name);
  }
}
