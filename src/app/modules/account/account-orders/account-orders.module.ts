import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOrdersRoutingModule } from './account-orders-routing.module';
import { AccountOrdersComponent } from './account-orders.component';


@NgModule({
  declarations: [AccountOrdersComponent],
  imports: [
    CommonModule,
    AccountOrdersRoutingModule
  ]
})
export class AccountOrdersModule { }
