import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pets/pets.component';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
  declarations: [
    HomeComponent,
    EmployeesComponent,
    PetsComponent
  ]
})
export class PagesModule { }
