
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../_api/service/api.service'

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public $employeeList: any;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {

    // Load all employee data from API
    let getEmployeeSub = this.apiService.getEmployees().subscribe(data => {
      getEmployeeSub.unsubscribe();
      this.$employeeList = data;
    });
  }
}
