import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedToCartComponent } from './added-to-cart.component';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [AddedToCartComponent],
    exports: [
        AddedToCartComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class AddedToCartModule { }
