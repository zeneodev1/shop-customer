import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from './account.component';
import {AccountDetailsModule} from './account-details/account-details.module';
import {AccountDashboardModule} from './account-dashboard/account-dashboard.module';
import {AccountOrdersModule} from './account-orders/account-orders.module';

const routes: Routes = [
  {path: '', redirectTo: '/account/dashboard', pathMatch: 'full'},
  {path: '', component: AccountComponent, children: [
      {path: 'dashboard', loadChildren: () => AccountDashboardModule},
      {path: 'orders', loadChildren: () => AccountOrdersModule},
      {path: 'details', loadChildren: () => AccountDetailsModule}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
