import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import {RouterModule} from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BotNavComponent } from './bot-nav/bot-nav.component';
import { MobNavComponent } from './mob-nav/mob-nav.component';
import { NavCartComponent } from './nav-cart/nav-cart.component';
import { AccountNavComponent } from './account-nav/account-nav.component';



@NgModule({
  declarations: [NavBarComponent, TopNavComponent, BotNavComponent, MobNavComponent, NavCartComponent, AccountNavComponent],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavBarModule { }
