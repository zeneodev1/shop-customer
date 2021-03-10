import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerInfo} from '../../../shared/model/customer-info.model';
import {UserActivityService} from '../../../core/service/user-activity.service';

@Component({
  selector: 'app-checkout-step-one',
  templateUrl: './checkout-step-one.component.html',
  styleUrls: ['./checkout-step-one.component.css']
})
export class CheckoutStepOneComponent implements OnInit {
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  customerInfo: CustomerInfo;
  infoForm: FormGroup;
  triedToSubmit = false;
  constructor() {
  }

  ngOnInit(): void {
    this.infoForm = new FormGroup({
      email: new FormControl(this.customerInfo.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.customerInfo.firstName, [Validators.required]),
      lastName: new FormControl(this.customerInfo.lastName, [Validators.required]),
      street: new FormControl(this.customerInfo.street, [Validators.required]),
      city: new FormControl(this.customerInfo.city, [Validators.required]),
      zip: new FormControl(this.customerInfo.zip, [Validators.required]),
      country: new FormControl(!this.customerInfo.country ? '' : this.customerInfo.country, [Validators.required]),
      state: new FormControl(this.customerInfo.state, [Validators.required]),
      phone: new FormControl(this.customerInfo.phone, [Validators.required]),
      company: new FormControl(this.customerInfo.company),
    });
    this.infoForm.valueChanges.subscribe(() => {
      this.customerInfo.email = this.email.value;
      this.customerInfo.firstName = this.firstName.value;
      this.customerInfo.lastName = this.lastName.value;
      this.customerInfo.street = this.street.value;
      this.customerInfo.city = this.city.value;
      this.customerInfo.zip = this.zip.value;
      this.customerInfo.country = this.country.value;
      this.customerInfo.state = this.state.value;
      this.customerInfo.phone = this.phone.value;
      this.customerInfo.company = this.company.value;
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
