import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/service/user.service';
import {User} from '../../../shared/model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailExists = false;
  registerForm: FormGroup;
  triedToSubmit = false;
  isSubmitting = false;
  constructor(private userService: UserService,
              private router: Router) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
      agreed: new FormControl(true, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  get firstName(): AbstractControl | null {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }


  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get passwordConfirmation(): AbstractControl | null {
    return this.registerForm.get('passwordConfirmation');
  }

  register(): boolean {
    this.triedToSubmit = true;
    if (this.registerForm.valid && this.password?.value === this.passwordConfirmation?.value && !this.isSubmitting) {
      this.isSubmitting = true;
      const user = new User();
      user.firstName = this.firstName.value;
      user.lastName = this.lastName.value;
      user.email = this.email.value;
      user.password = this.password.value;
      user.role = 'CUSTOMER';
      this.userService.register(user).toPromise().then(value => {
        this.router.navigate(['/auth/login']).then();
        this.isSubmitting = false;
      }).catch(reason => {
        this.emailExists = true;
        this.isSubmitting = false;
      });
    }
    return false;
  }

}
