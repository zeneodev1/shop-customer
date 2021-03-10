import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../model/department.model';
import {User} from '../../../model/user.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../core/store/auth/auth.reducer';
import {logout} from '../../../../core/store/auth/auth.action';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css']
})
export class AccountNavComponent implements OnInit {

  @Input()
  hidden = true;
  @Input()
  user: User;
  @Input()
  authenticated: boolean;
  @Output()
  closeNav: EventEmitter<void>;
  constructor(private store: Store<{auth: AuthState}>) {
    console.log(this.hidden);
    this.closeNav = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  closeNavBar(): void {
    this.closeNav.emit();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
  }

}
