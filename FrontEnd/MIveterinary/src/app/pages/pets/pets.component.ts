
import { Component, OnInit } from '@angular/core';
import { PetModel } from '../../_models/pet.model';
import { PetApiService } from 'src/app/_api/service/pet-api.service';
import { ToastrService } from 'ngx-toastr';
import { PetTypeModel } from 'src/app/_models/pet-type.model';
import { EmployeeModel } from 'src/app/_models/employee.model';
import { EmployeeApiService } from 'src/app/_api/service/employee-api.service';


@Component({
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss', './../_page-styles.scss']
})
export class PetsComponent implements OnInit {

  /** Attributes defenition */
  public $petList: Array<PetModel>;   // List of all Pets
  public $petTypeList: Array<PetTypeModel>;   // List of all Pet types
  public $employeeList: Array<EmployeeModel>;   // List of all Pet types
  public filterString: string;  // Filtering in table
  public newPetForm: PetModel = null;


  constructor(private petApiService: PetApiService,
    private employeeAPiService: EmployeeApiService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    // Load all employee data from API
    let getPetsSub = this.petApiService.getPets().subscribe((data: Array<PetModel>) => {
      getPetsSub.unsubscribe();
      this.$petList = data;
    });

    // Load all pet types
    let getPetTypesSub = this.petApiService.getPetTypes().subscribe((data: Array<PetTypeModel>) => {
      getPetTypesSub.unsubscribe();
      this.$petTypeList = data;
    });

    // Load all employees
    let getEmployeesSub = this.employeeAPiService.getEmployees().subscribe((data: Array<EmployeeModel>) => {
      getEmployeesSub.unsubscribe();

      // Add the custom attribute to the employees to filter in the table by both
      data.forEach(emp => emp._completeName = emp.firstName + " " + emp.lastName);

      this.$employeeList = data;
    });
  }

  /** Method callback when selecting an employee from list */
  employeeFound(emp: EmployeeModel, petId: number): void {

    // If petid is null, its a new item, so set it in the new form element
    if (petId == null) {
      this.newPetForm.employeeId = emp.id;
      this.newPetForm.employeeName = emp._completeName;
    } else {
      // Find Pet index to update the employee data
      let petIndex = this.$petList.findIndex(x => x.id === petId);
      this.$petList[petIndex].employeeId = emp.id;
      this.$petList[petIndex].employeeName = emp._completeName;
    }
  }

  /** Click on new pet button */
  createNewPet(): void {
    this.newPetForm = new PetModel();
  }

  /** Updates a pet */
  updatePet(pet: PetModel): void {

    // Check if all data is OK
    if (pet.name.length < 3 || pet.name.length > 45) {
      this.toastr.warning("Check the data. All field are requiered.")
      return;
    }

    // Set that the item is currently going to be updated on DB
    pet._isSaving = true;

    // Set petTypeId to int (Select convert int to string)
    pet.petTypeId = parseInt(pet.petTypeId.toString());

    // Call the update method from API
    let sub = this.petApiService.setPet(pet).subscribe(result => {
      sub.unsubscribe();

      // Set again default saving flag
      pet._isSaving = false;

      // Show corresponding alert message
      if (result)
        this.toastr.success(`Pet (${pet.id}) has been updated successfully!`);
      else
        this.toastr.error(`An unexpeted error has occuried updating the pet ${pet.id}`);

      // Set again item as saved
      pet._isEditing = false;

    });
  }

  /** Removes a Pet */
  deletePet(petId: number): void {

    // Call the update method from API
    let sub = this.petApiService.deletePet(petId).subscribe(result => {
      sub.unsubscribe();

      // Show corresponding alert message
      if (result) {
        this.toastr.success(`Pet (${petId}) has been removed!`);

        // Remove ite, from the main list
        this.$petList = this.$petList.filter(x => x.id != petId);
      }
      else
        this.toastr.error(`An unexpeted error has occuried updating the pet ${petId}`);
    });
  }


  /** Save new Employee data */
  saveNewPet(): void {

    // Check if all data is OK
    if (this.newPetForm.name?.length < 3 || this.newPetForm.name?.length > 45 ||
      this.newPetForm.employeeId == undefined || this.newPetForm.petTypeId == undefined ||
      this.newPetForm.employeeId == null || this.newPetForm.petTypeId == null) {
      this.toastr.warning("Check the data. All field are requiered.")
      return;
    }

    // Set petTypeId to int (Select convert int to string)
    this.newPetForm.petTypeId = parseInt(this.newPetForm.petTypeId.toString());

    // Set that the item is currently going to be updated on DB
    this.newPetForm._isSaving = true;

    // Call the update method from API
    let sub = this.petApiService.addPet(this.newPetForm).subscribe((newPet: PetModel) => {
      sub.unsubscribe();

      // Add new employee to the list
      this.$petList.push(newPet);

      // Remove new employee cache
      this.newPetForm = null;

      // Show success message
      this.toastr.success(`New Pet (${newPet.id}) successfully created!`);
      // Todo: Add error checks
    });
  }
}
