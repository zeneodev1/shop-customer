import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../shared/component/spinner/spinner.module';


@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountDetailsModule { }
