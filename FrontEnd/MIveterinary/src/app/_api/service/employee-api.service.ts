import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './../../_models/employee.model'
import { PetModel } from './../../_models/pet.model'

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {

  constructor(
    private http: HttpClient
  ) { }

  /** Get the list of employees  */
  public getEmployees(): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(environment.apiServer + "api/employees")
  }

  /** Update an employee */
  public setEmployee(employee: EmployeeModel): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.put(environment.apiServer + "api/employees", employee)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Create new employee */
  public addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    let updateResult = new Subject<EmployeeModel>();
    let sub = this.http.post(environment.apiServer + "api/employees", employee)
      .subscribe(
        (result: EmployeeModel) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Deletes an employee */
  public deleteEmployee(employeeId: number): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.delete(environment.apiServer + "api/employees/" + employeeId)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

}