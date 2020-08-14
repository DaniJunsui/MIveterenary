import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalEmployeePetListComponent } from "./employee-pet-list/employee-pet-list.component";

@NgModule({
    imports: [
        CommonModule 
    ],
    declarations: [
        ModalEmployeePetListComponent
    ],
    exports: [
        ModalEmployeePetListComponent
    ]

})
export class ModalModule { }
