import { Component, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeModel } from 'src/app/_models/employee.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
    selector: 'employee-searcher',
    templateUrl: './employee-searcher.component.html'
})
export class EmployeeSearcherComponent {

    @Input() employeeList: Array<EmployeeModel>;
    @Output() employeeSelected = new EventEmitter<EmployeeModel>();

    public selectedEmployee: EmployeeModel;

    // Employee search code & filtering
    formatter = (emp: EmployeeModel) => emp._completeName;
    employeeSearch = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter(term => term.length >= 2),
            map(term => this.employeeList.filter(emp => new RegExp(term, 'mi').test(emp._completeName)).slice(0, 10))
        )

}
