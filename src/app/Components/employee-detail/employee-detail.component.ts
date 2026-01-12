import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.interface';
import { ErrorResponse } from 'src/app/models/error-response.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (!employeeId) {
      this.errorMessage = 'Employee ID is missing.';
      return;
    }

    this.fetchEmployeeDetails(employeeId);
  }

  fetchEmployeeDetails(employeeId: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (response) => {
        this.employee = response.data;
        this.loading = false;
      },
      error: (error: ErrorResponse) => {
        this.errorMessage =
          error.errorMessage || 'Failed to load employee details.';
        this.loading = false;
      },
    });
  }

  goBackToList(): void {
    this.router.navigate(['/employees']);
  }

  goToEdit(): void {
    if (this.employee?.empId) {
      this.router.navigate(['/employees', this.employee.empId, 'edit']);
    }
  }
}