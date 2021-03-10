import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/model/category.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/model/department.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/categories');
  }

  getCategoryById(id: string | null): Observable<Category> {
    return this.httpClient.get<Category>(this.API_URL + '/categories/' + id);
  }

  getCategoriesByDepartmentId(id: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/departments/' + id + '/categories');
  }

}
