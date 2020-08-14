import { DataManagementModel } from './_dataManagemenet.model';

/** Data model: Pet (DB Table: pets) */
export class PetModel extends DataManagementModel {
    id: number;
    petTypeId: number;
    employeeId: number;
    name: string;
    petTypeName?: string;
    employeeName?: string;
}