
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PetModel } from 'src/app/_models/pet.model';
import { EmployeeModel } from 'src/app/_models/employee.model';
import { PetApiService } from 'src/app/_api/service/pet-api.service';

@Component({
  selector: 'modal-employee-pet-list',
  templateUrl: './employee-pet-list.component.html'
})
export class ModalEmployeePetListComponent {

  /** Input & Outputs for the modal */
  @Input() employee: EmployeeModel;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  /** Internal attributes */
  public isLoading: boolean = true;
  public $petList: Array<PetModel>;

  constructor(private petApiService: PetApiService) { }

  ngOnInit(): void {

    let getEmployeePets = this.petApiService.getPetsByEmployeeId(this.employee.id).subscribe((data: Array<PetModel>) => {
      this.$petList = data;
      getEmployeePets.unsubscribe();

      this.isLoading = false;
    });
  }


}
