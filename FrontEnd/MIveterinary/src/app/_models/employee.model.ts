import { DataManagementModel } from './_dataManagemenet.model';

/** Data model: Employee (DB Table: Employees) */
export class EmployeeModel extends DataManagementModel {
    id: number;
    firstName: string;
    lastName?: string;
    mediaInteractiveEmployee: boolean;
    numberOfPets?: number;

    // Internal ones
    _completeName: string;
}