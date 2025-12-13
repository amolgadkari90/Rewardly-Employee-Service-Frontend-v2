  // src/app/models/api-response.interface.ts
export interface ApiResponse<T=any> {

  

  /**
   * true  → request succeeded
   * false → request failed (validation, business rule, etc.)
   */
  success: boolean;

  /**
   * The actual payload (Employee, Employee[], string, null, etc.)
   * Use generics when consuming: ApiResponse<Employee> or ApiResponse<Employee[]>
   */
  data: T | null;

  /**
   * Human-readable message
   * e.g. "Employee created successfully", "Invalid designation", etc.
   */
  message?: string | null;

  /**
   * Request path (useful for debugging/logging)
   * e.g. "/api/employees/EMP001"
   */
  path?: string | null;

  /**
   * HTTP status code (200, 201, 400, 404, 500, etc.)
   */
  statusCode: number;

  /**
   * ISO timestamp from backend
   * Format: "2025-04-05T14:30:22"
   */
  timeStamp: string; // string because JSON sends LocalDateTime as formatted string


}


