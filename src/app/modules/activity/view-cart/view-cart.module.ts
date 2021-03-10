import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCartRoutingModule } from './view-cart-routing.module';
import { ViewCartComponent } from './view-cart.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../shared/component/spinner/spinner.module';


@NgModule({
  declarations: [ViewCartComponent],
    imports: [
        CommonModule,
        ViewCartRoutingModule,
        ReactiveFormsModule,
        SpinnerModule
    ]
})
export class ViewCartModule { }
