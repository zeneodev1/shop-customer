import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/service/user.service';
import {User} from '../../../shared/model/user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {CartState} from '../../../core/store/cart/cart.reducer';
import {AuthState} from '../../../core/store/auth/auth.reducer';
import {login} from '../../../core/store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  triedToSubmit = false;
  isSubmitting = false;
  loginError = false;
  constructor(private userService: UserService,
              private router: Router,
              private store: Store<{ cart: CartState, auth: AuthState }>) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  login(): boolean {
    this.triedToSubmit = true;
    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const user = new User();
      user.email = this.email.value;
      user.password = this.password.value;
      this.userService.login(user).toPromise().then(value => {
        this.isSubmitting = false;
        localStorage.setItem('token', value);
        this.store.dispatch(login({user: UserService.getUserObject()}));
        this.router.navigate(['/']).then();
      }).catch(reason => {
        this.loginError = true;
        this.isSubmitting = false;
      });
    }
    return false;
  }


  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
