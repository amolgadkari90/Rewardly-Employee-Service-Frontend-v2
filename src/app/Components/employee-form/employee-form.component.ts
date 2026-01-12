import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.interface';
import { ErrorResponse } from 'src/app/models/error-response.interface';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  submitting = false;
  loading = false; // For skeleton loading in edit mode

  apiGeneralError = '';
  apiSuccessMessage = '';

  isEditMode = false;
  currentEmployeeId: string | null = null;

  private routeSub: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.employeeForm = this.fb.group({
      empName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      empDesignation: ['', [Validators.required]],
      empSalary: [null, [Validators.required, Validators.min(0)]],
      empExperienceYears: [
        null,
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      empPerformanceRating: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.currentEmployeeId = params.get('id');
      this.isEditMode = !!this.currentEmployeeId;

      if (this.isEditMode && this.currentEmployeeId) {
        this.loading = true;
        this.loadEmployeeData(this.currentEmployeeId);
      } else {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  get form() {
    return this.employeeForm.controls;
  }

  private loadEmployeeData(employeeId: string): void {
    this.apiGeneralError = '';
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (response) => {
        const employee = response.data;
        if (!employee) {
          this.apiGeneralError = 'Employee not found.';
          this.toastService.error(this.apiGeneralError);
          this.loading = false;
          return;
        }

        this.employeeForm.patchValue({
          empName: employee.empName ?? '',
          empDesignation: employee.empDesignation ?? '',
          empSalary: employee.empSalary ?? null,
          empExperienceYears: employee.empExperienceYears ?? null,
          empPerformanceRating: employee.empPerformanceRating ?? null,
        });

        this.loading = false;
      },
      error: (error: ErrorResponse) => {
        this.apiGeneralError =
          error.errorMessage || 'Failed to load employee data.';
          this.toastService.error(this.apiGeneralError);
        this.loading = false;
      },
    });
  }

  submitForm(): void {
    this.apiGeneralError = '';
    this.apiSuccessMessage = '';

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload: Employee = this.employeeForm.value;

    // Clear any previous API errors
    Object.keys(this.employeeForm.controls).forEach((field) => {
      const control = this.employeeForm.get(field);
      if (control?.errors?.['apiError']) {
        const { apiError, ...rest } = control.errors;
        control.setErrors(Object.keys(rest).length ? rest : null);
      }
    });

    if (this.isEditMode && this.currentEmployeeId) {
      this.updateEmployee(this.currentEmployeeId, payload);
    } else {
      this.createEmployee(payload);
    }
  }

  private createEmployee(payload: Employee): void {
    this.employeeService.createEmployee(payload).subscribe({
      next: (response) => {
        this.submitting = false;
        this.apiSuccessMessage =
          response.message || 'Employee created successfully.';
          this.toastService.success(this.apiSuccessMessage);
        this.router.navigate(['/employees']);
      },
      error: (error: ErrorResponse) => {
        this.submitting = false;
        this.toastService.error(error.errorMessage || 'Failed to create employee.');
        this.handleApiError(error);
      },
    });
  }

  private updateEmployee(employeeId: string, payload: Employee): void {
    this.employeeService.updateEmployee(employeeId, payload).subscribe({
      next: (response) => {
        this.submitting = false;
        this.apiSuccessMessage =
          response.message || 'Employee updated successfully.';
          this.toastService.success(this.apiSuccessMessage);
        this.router.navigate(['/employees']);
      },
      error: (error: ErrorResponse) => {
        this.submitting = false;
        this.toastService.error(error.errorMessage || 'Failed to update employee.');
        this.handleApiError(error);
      },
    });
  }

  private handleApiError(error: ErrorResponse): void {
    this.apiGeneralError = error.errorMessage || 'An error occurred.';

    if (error.errors) {
      Object.keys(error.errors).forEach((fieldName) => {
        const formControl = this.employeeForm.get(fieldName);
        if (formControl) {
          formControl.setErrors({
            apiError: error.errors?.[fieldName],
          });
          formControl.markAsTouched();
        }
      });
    }
  }
}