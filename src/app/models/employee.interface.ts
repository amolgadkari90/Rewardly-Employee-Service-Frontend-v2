export interface Employee {
  
  /**
   * Unique Employee ID (String in backend, not auto-generated number)
   * Corresponds to @Id String empId in Java entity
   */
  //optional because it may not be set before creation
  empId?: string;

  /**
   * Full name of the employee
   * Required, 2–100 characters, only letters and spaces
   */
  empName: string;

  /**
   * Job title / designation
   * Required, same validation as name
   */
  empDesignation: string;

  /**
   * Monthly/Annual salary
   * Stored as BigDecimal in Java → use number in TypeScript (safe up to ~9 quadrillion)
   * For higher precision needs, consider string, but number is fine for 99% of UIs
   */
  empSalary: number;

  /**
   * Years of experience (e.g., 5.5, 12.0)
   * Stored as BigDecimal(3,1) → one decimal place max
   */
  empExperienceYears: number;

  /**
   * Performance rating from 1 to 5 (inclusive)
   */
  // Stored as TINYINT in Java → use union type for strictness
  /// Literal union type for strict 1–5 rating
  empPerformanceRating: 1 | 2 | 3 | 4 | 5;

}
