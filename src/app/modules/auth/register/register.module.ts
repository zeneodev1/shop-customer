import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../shared/component/spinner/spinner.module';


@NgModule({
  declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        SpinnerModule
    ]
})
export class RegisterModule { }
