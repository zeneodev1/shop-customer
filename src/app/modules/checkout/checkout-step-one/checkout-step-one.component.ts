import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerInfo} from '../../../shared/model/customer-info.model';
import {UserActivityService} from '../../../core/service/user-activity.service';
import {Address} from '../../../shared/model/address.model';

@Component({
  selector: 'app-checkout-step-one',
  templateUrl: './checkout-step-one.component.html',
  styleUrls: ['./checkout-step-one.component.css']
})
export class CheckoutStepOneComponent implements OnInit {
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  address: Address;
  infoForm: FormGroup;
  triedToSubmit = false;
  constructor() {
  }

  ngOnInit(): void {
    this.infoForm = new FormGroup({
      email: new FormControl(this.address.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.address.firstName, [Validators.required]),
      lastName: new FormControl(this.address.lastName, [Validators.required]),
      street: new FormControl(this.address.street, [Validators.required]),
      city: new FormControl(this.address.city, [Validators.required]),
      zip: new FormControl(this.address.zipCode, [Validators.required]),
      country: new FormControl(!this.address.country ? '' : this.address.country, [Validators.required]),
      state: new FormControl(this.address.state, [Validators.required]),
      phone: new FormControl(this.address.phoneNumber, [Validators.required]),
      company: new FormControl(this.address.company),
    });
    this.infoForm.valueChanges.subscribe(() => {
      this.address.email = this.email.value;
      this.address.firstName = this.firstName.value;
      this.address.lastName = this.lastName.value;
      this.address.street = this.street.value;
      this.address.city = this.city.value;
      this.address.zipCode = this.zip.value;
      this.address.country = this.country.value;
      this.address.state = this.state.value;
      this.address.phoneNumber = this.phone.value;
      this.address.company = this.company.value;
    });
  }

  get email(): AbstractControl {
    return this.infoForm.get('email');
  }

  get firstName(): any {
    return this.infoForm.get('firstName');
  }

  get lastName(): any {
    return this.infoForm.get('lastName');
  }

  get street(): any {
    return this.infoForm.get('street');
  }

  get city(): any {
    return this.infoForm.get('city');
  }

  get zip(): any {
    return this.infoForm.get('zip');
  }

  get country(): any {
    return this.infoForm.get('country');
  }

  get state(): any {
    return this.infoForm.get('state');
  }

  get phone(): any {
    return this.infoForm.get('phone');
  }

  get company(): any {
    return this.infoForm.get('company');
  }

  submitInfo(): void {
    this.triedToSubmit = true;
    if (this.infoForm.valid) {
      this.continue.emit();
    }
  }
}
