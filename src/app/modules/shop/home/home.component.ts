import { Component, OnInit } from '@angular/core';
import {DepartmentsService} from '../../../core/service/departments.service';
import {Department} from '../../../shared/model/department.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  departments: Department[] = [];
  constructor(private departmentsService: DepartmentsService) {
    departmentsService.getAllDepartments().toPromise().then(value => {
      this.departments = value;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }
}
