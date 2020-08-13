
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../_api/service/api.service'
import { EmployeeModel } from 'src/app/_models/employee.model';
import { PetModel } from 'src/app/_models/pet.model';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss', './../_page-styles.scss']
})
export class EmployeesComponent implements OnInit {

  /** Attributes defenition */
  public $employeeList: Array<EmployeeModel>;   // List of all Employees
  public filterString: string;  // Filtering in table

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Load all employee data from API
    let getEmployeeSub = this.apiService.getEmployees().subscribe((data: Array<EmployeeModel>) => {
      getEmployeeSub.unsubscribe();
      this.$employeeList = data;
    });

  }
}
