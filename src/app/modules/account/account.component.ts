import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../core/store/auth/auth.reducer';
import {Router} from '@angular/router';
import {logout} from '../../core/store/auth/auth.action';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private store: Store<{auth: AuthState}>,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this.router.navigate(['/']).then();
  }

}
