import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.interface';
import { ErrorResponse } from 'src/app/models/error-response.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  employees: Employee[] = [];
  loading = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void{

    this.fetchEmployees();
  }



  fetchEmployees() {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        //If it’s NOT null and NOT undefined, use it.
        //An array when everything is fine
        //null when no data exists
        // or (worst case) completely skip the field, giving you undefined

        this.employees = response.data ?? [];
        this.loading = false;
      },
      error: (error:ErrorResponse) => {
        this.errorMessage = error.errorMessage || 'Failed to load employees';
        this.loading = false;
      }
      
    });

  }


  deleteEmployee(empId: string){

    if(!confirm('Are you sure you want to delete this employee?')){
      return;
    }

    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        this.fetchEmployees(); // reload list
      },

      error: (error:ErrorResponse) => {
        alert(error.errorMessage || 'Delete failed');
      }
    });

  }





}
