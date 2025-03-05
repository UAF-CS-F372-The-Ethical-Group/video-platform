/**
 * Contains functions that assist in validating password complexity
 */

/**
 * Validates the complexity of the provided password
 * @param {string} password The password to validate
 * @returns {boolean}
 */
export default function validatePassword(password) {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialRegex = /[!@#$%^&*()_+]/;

    return (password.length === 8) && [
        lowercaseRegex,
        uppercaseRegex,
        numberRegex,
        specialRegex
    ].every(reg => reg.test(password));
}
