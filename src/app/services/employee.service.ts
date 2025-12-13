import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators'; // chnanges for the frontend consol logs

import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.interface';
import { ApiResponse } from '../models/api-response.interface';
import { ErrorResponse } from '../models/error-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly baseUrl = `${environment.apiBaseUrl}/employees`;

  constructor(private http: HttpClient) {}

  // Create employee
  createEmployee(payload: Employee): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(this.baseUrl, payload)
      .pipe(catchError(this.handleError));
  }

  // Get all employees
  getAllEmployees(): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(this.baseUrl)
      .pipe(
        tap(response => console.log('Get alll employees: ', response)),        
        catchError(this.handleError));
  }

  // Get employee by ID
  getEmployeeById(empId: string): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`${this.baseUrl}/${empId}`)
      .pipe(catchError(this.handleError));
  }

  // Update employee
  updateEmployee(empId: string, payload: Employee): Observable<ApiResponse<Employee>> {
    return this.http.put<ApiResponse<Employee>>(`${this.baseUrl}/${empId}`, payload)
      .pipe(catchError(this.handleError));
  }

  // Delete employee
  deleteEmployee(empId: string): Observable<ApiResponse<void>> {
      console.log(`Delete request url: ${this.baseUrl}/${empId}`)
      return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${empId}`)
      .pipe(
        tap(response => console.log('Deleted successfully for empId: ', empId)), 
        catchError(this.handleError));
  }

  // Central error handling (we'll map to ApiError)
  private handleError(err: HttpErrorResponse){

    let apiError : ErrorResponse;

    console.log('Http Error: ', err)

    if(err.error && typeof err.error === 'object'){

      apiError = err.error as ErrorResponse;

    } else{

      apiError = {

        success: false,
        status: err.status,
        errorCode: 'UNKNOWN_ERROR',
        errorMessage: err.message || 'Something went wrong',
        details: 'Inexpected error occured',
        path: '',
        timeStamp: new Date().toISOString()      

      };

    }

    return throwError(() => apiError);

  }
}
