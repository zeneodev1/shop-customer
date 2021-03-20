import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(this.api_url + '/users/' + UserService.getUserObject().id);
  }

  editUserInfo(userInfo: any, changeEmail: boolean, changePassword: boolean): Observable<void> {
    return this.httpClient.put<void>(this.api_url + '/users/' + UserService.getUserObject().id,
      userInfo,
      {
        params: new HttpParams({
          fromObject: {
            changeEmail: String(changeEmail),
            changePass: String(changePassword)
          }
        })
      });
  }

}

