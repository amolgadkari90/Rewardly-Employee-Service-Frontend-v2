import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.interface';
import { ErrorResponse } from 'src/app/models/error-response.interface';
import { debounceTime, startWith, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  allEmployees: Employee[] = [];

  loading = true;
  errorMessage = '';

  // Filters
  searchControl = new FormControl('');
  designationControl = new FormControl('');
  ratingControl = new FormControl('');

  // Sorting
  sortField: string = 'empName';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();

    combineLatest([
      this.searchControl.valueChanges.pipe(startWith('')),
      this.designationControl.valueChanges.pipe(startWith('')),
      this.ratingControl.valueChanges.pipe(startWith('')),
    ])
      .pipe(debounceTime(300))
      .subscribe(([search, designation, rating]) => {
        this.currentPage = 1;
        this.applyFilters(search, designation, rating);
      });
  }

  fetchEmployees(): void {
    this.loading = true;

    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.allEmployees = response.data || [];
        this.applyFilters(
          this.searchControl.value,
          this.designationControl.value,
          this.ratingControl.value
        );
        this.loading = false;
      },
      error: (error: ErrorResponse) => {
        this.errorMessage =
          error.errorMessage ||
          'Unable to load employees. Please try again later.';
        this.employees = [];
        this.loading = false;

        this.toastService.error(this.errorMessage);
      },
    });
  }

  deleteEmployee(employeeId: string): void {
    const confirmed = confirm(
      'Are you sure you want to delete this employee? This action cannot be undone.'
    );

    if (!confirmed) {
      this.toastService.info('Employee deletion cancelled');
      return;
    }

    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.fetchEmployees();
        this.toastService.success('Employee deleted successfully');
      },
      error: (error: ErrorResponse) => {
        const message =
          error.errorMessage || 'Failed to delete employee. Please try again.';
        this.toastService.error(message);
      },
    });
  }

  // Rating badge CSS class
  getRatingClass(rating: number): string {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 3.5) return 'good';
    if (rating >= 2.0) return 'average';
    return 'poor';
  }

  applyFilters(
    search: string | null,
    designation: string | null,
    rating: string | null
  ): void {
    let filtered = [...this.allEmployees];

    const searchValue = search?.trim().toLowerCase();

    if (searchValue) {
      filtered = filtered.filter(
        (emp) =>
          emp.empId?.toLowerCase().includes(searchValue) ||
          emp.empName?.toLowerCase().includes(searchValue) ||
          emp.empDesignation?.toLowerCase().includes(searchValue)
      );
    }

    if (designation) {
      filtered = filtered.filter(
        (emp) => emp.empDesignation === designation
      );
    }

    if (rating) {
      filtered = filtered.filter(
        (emp) => emp.empPerformanceRating.toString() === rating
      );
    }

    this.totalPages = Math.ceil(filtered.length / this.pageSize);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.employees = this.sortEmployees(
      filtered.slice(startIndex, endIndex)
    );
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.employees = this.sortEmployees([...this.employees]);
  }

  sortEmployees(list: Employee[]): Employee[] {
    return list.sort((a: any, b: any) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (valueA == null || valueB == null) return 0;

      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  // Pagination
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters(
      this.searchControl.value,
      this.designationControl.value,
      this.ratingControl.value
    );
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}