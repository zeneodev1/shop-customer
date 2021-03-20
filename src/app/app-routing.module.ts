import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from './modules/auth/login/login.module';
import {RegisterModule} from './modules/auth/register/register.module';
import {DepartmentModule} from './modules/shop/department/department.module';
import {ProductModule} from './modules/shop/product/product.module';
import {ViewCartModule} from './modules/activity/view-cart/view-cart.module';
import {WishListModule} from './modules/activity/wish-list/wish-list.module';
import {HomeModule} from './modules/shop/home/home.module';
import {CheckoutModule} from './modules/checkout/checkout.module';
import {AccountModule} from './modules/account/account.module';

const routes: Routes = [
  {path: 'auth', children: [
      {path: 'login', loadChildren: () => LoginModule},
      {path: 'register', loadChildren: () => RegisterModule},
    ]},
  {path: 'activity', children: [
      {path: 'cart', loadChildren: () => ViewCartModule},
      {path: 'wishlist', loadChildren: () => WishListModule},
    ]},
  {path: 'products/:department', loadChildren: () => DepartmentModule},
  {path: 'product/:productName', loadChildren: () => ProductModule},
  {path: '', loadChildren: () => HomeModule},
  {path: 'checkout', loadChildren: () => CheckoutModule},
  {path: 'account', loadChildren: () => AccountModule},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
