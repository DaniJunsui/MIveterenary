import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './../../_models/employee.model'

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {

  private _ApiController = "api/employees/"; // Define the default API url

  constructor(
    private http: HttpClient
  ) { }

  /** Get the list of employees  */
  public getEmployees(): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(environment.apiServer + this._ApiController)
  }

  /** Update an employee */
  public setEmployee(employee: EmployeeModel): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.put(environment.apiServer + this._ApiController, employee)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Create new employee */
  public addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    let updateResult = new Subject<EmployeeModel>();
    let sub = this.http.post(environment.apiServer + this._ApiController, employee)
      .subscribe(
        (result: EmployeeModel) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Deletes an employee */
  public deleteEmployee(employeeId: number): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.delete(environment.apiServer + this._ApiController + employeeId)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

}