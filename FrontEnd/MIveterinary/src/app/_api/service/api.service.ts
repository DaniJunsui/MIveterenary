import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from './../../_models/employee.model'
import { PetModel } from './../../_models/pet.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  /** Get the list of employees  */
  public getEmployees(): Observable<Array<EmployeeModel>> {
    return this.http.get<Array<EmployeeModel>>(environment.apiServer + "api/employees")
  }

  /** Get the list of pets  */
  public getPets(): Observable<Array<PetModel>> {
    return this.http.get<Array<PetModel>>(environment.apiServer + "api/pets")
  }

  /** Get the list of pets  */
  public getPetsByEmployeeId(id: number): Observable<Array<PetModel>> {
    return this.http.get<Array<PetModel>>(environment.apiServer + "api/pets/" + id)
  }
}