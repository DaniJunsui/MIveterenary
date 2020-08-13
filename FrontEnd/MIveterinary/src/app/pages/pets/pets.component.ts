
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../_api/service/api.service'
import { PetModel } from '../../_models/pet.model';

@Component({
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss', './../_page-styles.scss']
})
export class PetsComponent implements OnInit {

  /** Attributes defenition */
  public $petList: Array<PetModel>;   // List of all Pets
  public filterString: string;  // Filtering in table


  constructor(private apiService: ApiService) { }

  
  ngOnInit(): void {
    // Load all employee data from API
    let getPetsSub = this.apiService.getPets().subscribe((data: Array<PetModel>) => {
      getPetsSub.unsubscribe();
      this.$petList = data;
    });
  }

}
