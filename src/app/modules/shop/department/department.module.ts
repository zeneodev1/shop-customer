import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import {ProductCardModule} from '../../../shared/component/product-card/product-card.module';
import {FormsModule} from '@angular/forms';
import {AddedToCartModule} from '../../../shared/component/modal/added-to-cart/added-to-cart.module';


@NgModule({
  declarations: [DepartmentComponent],
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        ProductCardModule,
        FormsModule,
        AddedToCartModule
    ]
})
export class DepartmentModule { }
