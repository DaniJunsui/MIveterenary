import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  /** Get the list of employees  */
  public getEmployees(): Observable<any> {
    return this.http.get(environment.apiServer + "api/employees")
  }
}