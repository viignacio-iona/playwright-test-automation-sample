/**
 * Helper function to generate random email address.
 * Same logic as Cypress template support/e2e.ts.
 */
export function generateRandomEmail(): string {
  return `test${Date.now()}${Math.random().toString(36).substring(2, 8)}@test.com`;
}
