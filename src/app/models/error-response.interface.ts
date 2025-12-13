export interface ErrorResponse {
     /**
   * Always false for error responses
   */
  success: false | boolean; 

  /**
   * HTTP status code (e.g., 400, 404, 500, 422)
   */
  status: number;

  /**
   * Custom application error code (optional)
   * e.g., "EMP001", "VALIDATION_FAILED", "NOT_FOUND"
   */
  errorCode?: string | null;

  /**
   * Short error title/summary
   * e.g., "Bad Request", "Employee Not Found"
   */
  errorMessage?: string | null;

  /**
   * Detailed explanation (optional, for debugging)
   */
  details?: string | null;

  /**
   * Request path that caused the error
   * e.g., "/api/employees/EMP999"
   */
  path?: string | null;

  /**
   * Field-specific validation errors
   * Key → field name (e.g., "empName", "empSalary")
   * Value → error message
   */
  errors?: Record<string, string>;

  /**
   * ISO timestamp when error occurred
   * Format: "2025-12-07T14:30:45"
   */
  timeStamp: string;

}
