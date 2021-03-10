import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import {ProductRoutingModule} from '../../../modules/shop/product/product-routing.module';
import {SpinnerModule} from '../spinner/spinner.module';
import {AddedToCartModule} from '../modal/added-to-cart/added-to-cart.module';
import {AddedToWishModule} from '../modal/added-to-wish/added-to-wish.module';



@NgModule({
    declarations: [ProductCardComponent],
    exports: [
        ProductCardComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        SpinnerModule,
        AddedToCartModule,
        AddedToWishModule
    ]
})
export class ProductCardModule { }
