import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import {UserService} from '../../../core/service/user.service';
import {User} from '../../../shared/model/user.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  triedToSubmit = false;
  isSubmitting = false;
  accountForm: FormGroup;
  passwordForm: FormGroup;
  emailForm: FormGroup;
  changeEmail = false;
  changePassword = false;
  loadingAccount = false;
  savingAccount = false;
  constructor(private userService: UserService) {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirmation: new FormControl('', Validators.required),
    });
    this.loadAccount();
  }

  loadAccount(): void {
    this.loadingAccount = true;
    this.userService.getUserInfo().toPromise().then((res: User) => {
      this.loadingAccount = false;
      this.accountForm.get('firstName').setValue(res.firstName);
      this.accountForm.get('lastName').setValue(res.lastName);
      this.emailForm.get('email').setValue(res.email);
    });
  }

  ngOnInit(): void {
  }

  get fName(): AbstractControl {
    return this.accountForm.get('firstName');
  }

  get lName(): AbstractControl {
    return this.accountForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.emailForm.get('email');
  }

  get currentPassword(): AbstractControl {
    return this.passwordForm.get('currentPassword');
  }

  get newPassword(): AbstractControl {
    return this.passwordForm.get('newPassword');
  }

  get newPasswordConfirmation(): AbstractControl {
    return this.passwordForm.get('newPasswordConfirmation');
  }

  submitChanges(): void {
    this.triedToSubmit = true;
    let editRequest = {};
    if (this.accountForm.valid) {
      editRequest = {...editRequest, firstName: this.fName.value, lastName: this.lName.value};
    }
    if (this.changeEmail) {
      editRequest = {...editRequest, email: this.email.value};
    } else {
      return;
    }

    if (this.changePassword && this.newPassword.value === this.newPasswordConfirmation.value) {
      editRequest = {...editRequest, currentPassword: this.currentPassword.value, newPassword: this.newPassword.value};
    } else {
      return;
    }
    this.isSubmitting = true;
    this.userService.editUserInfo(editRequest, this.changeEmail, this.changePassword).subscribe(value => {
      this.isSubmitting = false;
    });

  }

}
