import { Injectable } from '@angular/core';
import {Department} from '../../shared/model/department.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.API_URL + '/departments');
  }

  getDepartmentById(id: string | null): Observable<Department> {
    return this.httpClient.get<Department>(this.API_URL + '/departments/' + id);
  }


  getDepartmentByName(departmentName: string): Observable<Department> {
    return this.httpClient.get<Department>(this.API_URL + '/departments/name/' + departmentName);
  }
}
