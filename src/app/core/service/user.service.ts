import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../shared/model/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  private api_url = environment.api_url;

  static isAuthenticated(): boolean {
    return !jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  static getUserObject(): User {
    return jwtHelper.decodeToken<User>(localStorage.getItem('token'));
  }

  login(user: User): Observable<any> {
    return this.httpClient.post(this.api_url + '/users/login',
      user,
      {
        responseType: 'text'
      });
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(this.api_url + '/users/register', user);
  }
}

