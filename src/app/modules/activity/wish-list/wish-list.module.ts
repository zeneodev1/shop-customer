import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list.component';
import {SpinnerModule} from '../../../shared/component/spinner/spinner.module';
import { WishItemComponent } from './wish-item/wish-item.component';


@NgModule({
  declarations: [WishListComponent, WishItemComponent],
    imports: [
        CommonModule,
        WishListRoutingModule,
        SpinnerModule
    ]
})
export class WishListModule { }
