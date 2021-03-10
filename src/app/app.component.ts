import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from './core/store/auth/auth.reducer';
import {CartState} from './core/store/cart/cart.reducer';
import {login} from './core/store/auth/auth.action';
import {UserService} from './core/service/user.service';
import {addAllToCart} from './core/store/cart/cart.action';
import {UserActivityService} from './core/service/user-activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }
}
