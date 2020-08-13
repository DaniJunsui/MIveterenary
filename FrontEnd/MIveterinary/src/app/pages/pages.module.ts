import { NgModule } from '@angular/core';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({

  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    EmployeesComponent
  ]
})
export class PagesModule { }
