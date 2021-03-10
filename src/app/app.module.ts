import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavBarModule} from './shared/component/nav-bar/nav-bar.module';
import { StoreModule } from '@ngrx/store';
import {authReducer} from './core/store/auth/auth.reducer';
import {cartReducer} from './core/store/cart/cart.reducer';
import {wishReducer} from './core/store/wishlist/wish.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WishEffects} from './core/store/wishlist/wish.effects';
import {AuthEffects} from './core/store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NavBarModule,
      EffectsModule.forRoot([WishEffects, AuthEffects]),
      StoreModule.forRoot({auth: authReducer, cart: cartReducer, wish: wishReducer}, {})
    ],
  providers: [
    WishEffects,
    AuthEffects,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
