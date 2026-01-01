import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.interface';
import { ErrorResponse } from 'src/app/models/error-response.interface';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | null = null; 
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    console.log('[EmployeeDetailComponent] Constructor called');
  }

  ngOnInit(): void {
    console.log('[EmployeeDetailComponent] ngOnInit started');

    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log('[EmployeeDetailComponent] Extracted employeeId from route:', employeeId);

    if (!employeeId) {
      this.errorMessage = 'Employee id missing in the URL!';
      console.warn('[EmployeeDetailComponent] No employeeId found in URL params');
      return;
    } 

    this.fetchEmployee(employeeId);
  }

  private fetchEmployee(employeeId: string) {
    console.log(`[EmployeeDetailComponent] Fetching employee with ID: ${employeeId}`);
    this.loading = true;
    this.errorMessage = ''; // Clear previous errors

    this.employeeService.getEmployeeById(employeeId).subscribe({ 
      next: (response) => {
        console.log('[EmployeeDetailComponent] Employee data received:', response.data);
        this.employee = response.data;
        this.loading = false;
      },

      error: (error: ErrorResponse) => {
        console.error('[EmployeeDetailComponent] Error fetching employee:', error);
        this.errorMessage = error.errorMessage || 'Failed to load employee details!';
        this.loading = false;
      },

      complete: () => {
        console.log('[EmployeeDetailComponent] getEmployeeById observable completed');
      }
    });    
  }

  goBackToList() {
    console.log('[EmployeeDetailComponent] Navigating back to employee list');
    this.router.navigate(['/employees']);
  }

  goToEdit() {
    if (this.employee?.empId) {
      console.log(`[EmployeeDetailComponent] Navigating to edit employee: ${this.employee.empId}`);
      this.router.navigate(['/employees', this.employee.empId, 'edit']);      
    } else {
      console.warn('[EmployeeDetailComponent] Cannot navigate to edit: employee or empId is null');
    }
  }
}