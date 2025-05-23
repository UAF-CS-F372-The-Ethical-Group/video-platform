/**
 * Contains functions that assist in validating password complexity
 */

/**
 * Validates the complexity of the provided password
 */
export default function validatePassword(password: string): boolean {
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialRegex = /[!@#$%^&*()_+.]/;

  return (password.length === 8) && [
    lowercaseRegex,
    uppercaseRegex,
    numberRegex,
    specialRegex,
  ].every((reg) => reg.test(password));
}
