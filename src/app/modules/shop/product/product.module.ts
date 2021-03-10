import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {ProductCardModule} from '../../../shared/component/product-card/product-card.module';
import {AddedToCartModule} from '../../../shared/component/modal/added-to-cart/added-to-cart.module';
import {SpinnerModule} from '../../../shared/component/spinner/spinner.module';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductCardModule,
    AddedToCartModule,
    SpinnerModule
  ]
})
export class ProductModule { }
