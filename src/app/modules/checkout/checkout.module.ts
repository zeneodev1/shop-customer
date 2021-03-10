import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutStepOneComponent } from './checkout-step-one/checkout-step-one.component';
import { CheckoutStepTwoComponent } from './checkout-step-two/checkout-step-two.component';
import { CheckoutStepThreeComponent } from './checkout-step-three/checkout-step-three.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../shared/component/spinner/spinner.module';
import {GooglePayButtonModule} from '@google-pay/button-angular';


@NgModule({
  declarations: [CheckoutComponent, CheckoutStepOneComponent, CheckoutStepTwoComponent, CheckoutStepThreeComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SpinnerModule,
    GooglePayButtonModule
  ]
})
export class CheckoutModule { }
