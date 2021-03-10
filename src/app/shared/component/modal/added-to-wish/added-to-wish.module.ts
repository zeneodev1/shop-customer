import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedToWishComponent } from './added-to-wish.component';



@NgModule({
    declarations: [AddedToWishComponent],
    exports: [
        AddedToWishComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AddedToWishModule { }
