/**
 * Contains functions that facilitate hashing and security of
 * passwords.
 */

import { createHash } from "node:crypto";

/**
 * Takes a password and return the SHA256 hashed represenation of it
 */
export default function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("base64");
}
