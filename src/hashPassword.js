import { createHash } from "node:crypto"

/**
 * Takes a password and return the SHA256 hashed represenation of it
 * @param {string} password The plaintext password to hash
 * @returns The hashed password
 */
export default function hashPassword(password) {
    return createHash("sha256").update(password).digest("base64")
}
