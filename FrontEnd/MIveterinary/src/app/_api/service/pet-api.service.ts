import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PetTypeModel } from './../../_models/pet-type.model'
import { PetModel } from './../../_models/pet.model'

@Injectable({
  providedIn: 'root',
})
export class PetApiService {

  private _ApiController = "api/pets/"; // Define the default API url

  constructor(
    private http: HttpClient
  ) { }
  /** Get the list of pets  */
  public getPets(): Observable<Array<PetModel>> {
    return this.http.get<Array<PetModel>>(environment.apiServer + this._ApiController)
  }

  /** Get the list of pets  */
  public getPetsByEmployeeId(id: number): Observable<Array<PetModel>> {
    return this.http.get<Array<PetModel>>(environment.apiServer + this._ApiController + "byEmployeeId/" + id)
  }

  /** Get the list of pet types  */
  public getPetTypes(): Observable<Array<PetTypeModel>> {
    return this.http.get<Array<PetModel>>(environment.apiServer + this._ApiController + "petTypes/")
  }



  /** Update an pet */
  public setPet(pet: PetModel): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.put(environment.apiServer + this._ApiController, pet)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Create new pet */
  public addPet(pet: PetModel): Observable<PetModel> {
    let updateResult = new Subject<PetModel>();
    let sub = this.http.post(environment.apiServer + this._ApiController, pet)
      .subscribe(
        (result: PetModel) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

  /** Deletes an pet */
  public deletePet(petId: number): Observable<boolean> {
    let updateResult = new Subject<boolean>();
    let sub = this.http.delete(environment.apiServer + this._ApiController + petId)
      .subscribe(
        (result: boolean) => { sub.unsubscribe(); updateResult.next(result) },
        err => { console.error(err) }
      )
    return updateResult.asObservable();
  }

}