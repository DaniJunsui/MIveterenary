
/** Data model: Pet (DB Table: pets) */
export class PetModel {
    // Database data
    id: number;
    petTypeId: number;
    employeeId: number;
    name: string;

    // Calculated data
    petTypeName?: string;
    employeeName?: string;
}