/**
 * Client-side field-level validation rules with clear, friendly messages.
 */

const NAME_RE = /^[A-Za-z\s]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DIGITS_ONLY_RE = /^\d+$/;
const SPECIAL_CHAR_RE = /[^A-Za-z0-9]/g;

/**
 * Validates full name:
 * - Required
 * - Alphabetic characters and spaces only
 * - No numbers or special characters
 */
export function validateName(value: string | undefined | null): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Name is required.";
  if (!NAME_RE.test(v)) return "Name can contain only letters and spaces.";
  return null;
}

/**
 * Validates email address:
 * - Required
 * - Standard valid email format
 */
export function validateEmail(value: string | undefined | null): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return null;
}

/**
 * Validates password:
 * - Required
 * - Must contain at least one alphabetic character
 * - Must contain at least one number
 */
export function validatePassword(value: string | undefined | null): string | null {
  const v = value ?? "";
  if (!v) return "Password is required.";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) {
    return "Password must contain at least one letter and one number.";
  }
  return null;
}

/**
 * Validates mobile number:
 * - Required
 * - Only digits (numbers)
 * - Exactly 10 digits
 */
export function validateMobile(value: string | undefined | null): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Mobile number is required.";
  if (!DIGITS_ONLY_RE.test(v)) return "Mobile number can contain only numbers.";
  if (v.length !== 10) return "Mobile number must contain exactly 10 digits.";
  return null;
}

/**
 * Validates username:
 * - Required
 * - Alphanumeric characters
 * - At most one special character allowed
 * - No whitespace
 */
export function validateUsername(value: string | undefined | null): string | null {
  const v = (value ?? "").trim();
  if (!v) return "Username is required.";
  if (/\s/.test(v)) return "Username cannot contain spaces.";
  
  const specials = v.match(SPECIAL_CHAR_RE) ?? [];
  if (specials.length > 1) {
    return "Username can contain letters, numbers, and one special character.";
  }
  // Must contain at least one alphanumeric character
  if (!/[A-Za-z0-9]/.test(v)) {
    return "Username can contain letters, numbers, and one special character.";
  }
  return null;
}
