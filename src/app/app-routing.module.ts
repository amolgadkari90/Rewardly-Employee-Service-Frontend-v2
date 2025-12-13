import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';

const routes: Routes = [

  {
    path: '', 
    redirectTo: 'employees', 
    pathMatch: 'full'
  },

  { 
    path: 'employees',
    component: EmployeeListComponent
  },

  {
    path: 'employees/new',  // does not matter backend 
    component: EmployeeFormComponent
  }

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
