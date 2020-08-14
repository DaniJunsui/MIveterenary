
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeApiService } from './../../_api/service/employee-api.service'
import { EmployeeModel } from 'src/app/_models/employee.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss', './../_page-styles.scss']
})
export class EmployeesComponent implements OnInit {

    /** Attributes defenition */
    public $employeeList: Array<EmployeeModel>;   // List of all Employees
    public filterString: string;  // Filtering in table
    public _currentEmployeeSelected: EmployeeModel; // Current employee with open modal
    public newEmployeeForm: EmployeeModel = null;

    /** Modals to load */
    @ViewChild("employeePetListModal") employeePetListModal;

    constructor(private employeeApiService: EmployeeApiService,
        private modalService: NgbModal,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        // Load all employee data from API
        let getEmployees = this.employeeApiService.getEmployees().subscribe((data: Array<EmployeeModel>) => {
            getEmployees.unsubscribe();

            // Add the custom attribute to the employees to filter in the table by both
            data.forEach(emp => emp._completeName = emp.firstName + " " + emp.lastName);

            // Add data to the item list
            this.$employeeList = data;
        });
    }

    /** Load the pets from an employee */
    openEmployeePetListModal(employee: EmployeeModel) {
        this._currentEmployeeSelected = employee;
        this.modalService.open(this.employeePetListModal, { ariaLabelledBy: 'modal-basic-title' })
    }


    /** Updates an employee data */
    updateEmployee(emp: EmployeeModel): void {

        // Check if all data is OK
        if (emp.firstName?.length < 3 || emp.firstName?.length > 45 ||
            emp.lastName?.length < 3 || emp.lastName?.length > 45) {
            this.toastr.warning("Check the data. All field are requiered.")
            return;
        }

        // Set that the item is currently going to be updated on DB
        emp._isSaving = true;

        // Call the update method from API
        let sub = this.employeeApiService.setEmployee(emp).subscribe(result => {
            sub.unsubscribe();

            // Set again default saving flag
            emp._isSaving = false;

            // Show corresponding alert message
            if (result)
                this.toastr.success(`Employee (${emp.id}) has been updated successfully!`);
            else
                this.toastr.error(`An unexpeted error has occuried updating the employee ${emp.id}`);

            // Set again item as saved
            emp._isEditing = false;

        });
    }

    /** Click on Create new Employee button */
    createNewEmployee(): void {
        this.newEmployeeForm = new EmployeeModel();
    }

    /** Save new Employee data */
    saveNewEmployee(): void {

        // Check if all data is OK
        if (this.newEmployeeForm.firstName?.length < 3 || this.newEmployeeForm.firstName?.length > 45 ||
            this.newEmployeeForm.lastName?.length < 3 || this.newEmployeeForm.lastName?.length > 45) {
            this.toastr.warning("Check the data. All field are requiered.")
            return;
        }

        // Set that the item is currently going to be updated on DB
        this.newEmployeeForm._isSaving = true;

        // Call the update method from API
        let sub = this.employeeApiService.addEmployee(this.newEmployeeForm).subscribe((newEmployee: EmployeeModel) => {
            sub.unsubscribe();

            // Add new employee to the list
            this.$employeeList.push(newEmployee);

            // Remove new employee cache
            this.newEmployeeForm = null;

            // Show success message
            this.toastr.success(`New Employee (${newEmployee.id}) successfully created!`);
            // Todo: Add error checks
        });
    }


    /** Removes an employee */
    deleteEmployee(employeeId: number): void {

        // Call the update method from API
        let sub = this.employeeApiService.deleteEmployee(employeeId).subscribe(result => {
            sub.unsubscribe();

            // Show corresponding alert message
            if (result) {
                this.toastr.success(`Employee (${employeeId}) has been removed!`);

                // Remove ite, from the main list
                this.$employeeList = this.$employeeList.filter(x => x.id != employeeId);
            }
            else
                this.toastr.error(`An unexpeted error has occuried updating the employee ${employeeId}`);


        });
    }

}
