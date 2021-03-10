import { Component, OnInit } from '@angular/core';
import {DepartmentsService} from '../../../core/service/departments.service';
import {Department} from '../../model/department.model';
import {UserService} from '../../../core/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  departments: Department[];
  constructor(private departmentsService: DepartmentsService) {
    departmentsService.getAllDepartments().toPromise().then(ds => {
      this.departments = ds;
    });
  }

  ngOnInit(): void {
  }

}
