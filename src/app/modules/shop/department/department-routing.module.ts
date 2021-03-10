import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentComponent} from './department.component';

const routes: Routes = [
  {path: '', component: DepartmentComponent, data: {
    max: '-1', min: -1, size: -1, page: -1
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
