import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { PipesModule } from '../_pipes/pipes.module';
import { ModalModule } from './_modals/modals.module'
import { CommonComponentsModule } from './../common-components/common-components.module'

import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pets/pets.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    ModalModule,
    CommonComponentsModule,
 
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  declarations: [
    HomeComponent,
    EmployeesComponent,
    PetsComponent
  ]
})
export class PagesModule { }
