import { NgModule } from "@angular/core";
import { EmployeeSearcherComponent } from "./employee-search/employee-searcher.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations: [EmployeeSearcherComponent],
    exports: [EmployeeSearcherComponent]

})
export class CommonComponentsModule { }